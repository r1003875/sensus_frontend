import { supabase } from '@/lib/supabase'
import { sessionStorageHelper } from '@/lib/sessionStorage'

const AUTH_SESSION_KEY = 'sensus-session'
const AUTH_SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000
const isBrowser = typeof window !== 'undefined'

const normalizeCode = (value) => String(value ?? '').replace(/\s+/g, '').trim()

const parseSession = (rawSession) => {
  if (!rawSession) {
    return null
  }

  try {
    const parsedSession = JSON.parse(rawSession)
    if (typeof parsedSession?.code !== 'string' || typeof parsedSession?.timestamp !== 'string') {
      return null
    }

    return {
      code: normalizeCode(parsedSession.code),
      timestamp: parsedSession.timestamp,
    }
  } catch (error) {
    console.error('Kon de codesessie niet lezen.', error)
    return null
  }
}

const readAuthSession = () => {
  if (!isBrowser) {
    return null
  }

  return parseSession(sessionStorageHelper.readStorageValue(window.sessionStorage, AUTH_SESSION_KEY))
}

const isSessionExpired = (session) => {
  if (!session?.timestamp) {
    return true
  }

  const sessionTimestamp = new Date(session.timestamp)
  if (Number.isNaN(sessionTimestamp.getTime())) {
    return true
  }

  return Date.now() - sessionTimestamp.getTime() > AUTH_SESSION_MAX_AGE_MS
}

const hasValidAuthSession = () => {
  const session = readAuthSession()
  return Boolean(session && !isSessionExpired(session))
}

const saveAuthSession = ({ code, timestamp }) => {
  if (!isBrowser) {
    return
  }

  sessionStorageHelper.writeStorageValue(window.sessionStorage, AUTH_SESSION_KEY, JSON.stringify({ code, timestamp }))
}

const clearAuthSession = () => {
  if (!isBrowser) {
    return
  }

  sessionStorageHelper.removeStorageValue(window.sessionStorage, AUTH_SESSION_KEY)
}

const validateAuthCode = async (inputCode) => {
  const code = normalizeCode(inputCode)

  if (!/^\d{6}$/.test(code)) {
    return {
      valid: false,
      message: 'Voer een geldige 6-cijferige code in.',
    }
  }

  const { data: codeRecord, error: fetchError } = await supabase
    .from('codes')
    .select('code, expires_at, used, used_at, usage_count, max_usage')
    .eq('code', code)
    .maybeSingle()

  if (fetchError) {
    throw fetchError
  }

  if (!codeRecord) {
    return {
      valid: false,
      message: 'Deze code is niet geldig.',
    }
  }

  const expiresAt = new Date(codeRecord.expires_at)
  if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
    return {
      valid: false,
      message: 'Deze code is verlopen.',
    }
  }

  const usageCount = Number(codeRecord.usage_count ?? 0)
  const maxUsage = Number(codeRecord.max_usage ?? 0)

  if (!Number.isFinite(usageCount) || !Number.isFinite(maxUsage) || usageCount >= maxUsage) {
    return {
      valid: false,
      message: 'Deze code heeft de gebruikslimiet bereikt.',
    }
  }

  const timestamp = new Date().toISOString()
  const nextUsageCount = usageCount + 1

  const { data: updatedCode, error: updateError } = await supabase
    .from('codes')
    .update({
      usage_count: nextUsageCount,
      used: true,
      used_at: timestamp,
    })
    .eq('code', code)
    .eq('usage_count', usageCount)
    .select('code')
    .maybeSingle()

  if (updateError) {
    throw updateError
  }

  if (!updatedCode) {
    return {
      valid: false,
      message: 'Deze code werd net al gebruikt. Probeer opnieuw.',
    }
  }

  saveAuthSession({ code, timestamp })

  return {
    valid: true,
    session: {
      code,
      timestamp,
    },
  }
}

export const useAuthCode = () => ({
  readAuthSession,
  hasValidAuthSession,
  clearAuthSession,
  validateAuthCode,
  saveAuthSession,
})
