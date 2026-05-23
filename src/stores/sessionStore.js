import { reactive } from 'vue'
import { supabase } from '@/lib/supabase'
import { sessionStorageHelper } from '@/lib/sessionStorage'

const STORAGE_KEY = 'sensus-session-store'

const createInitialState = () => ({
  sessionId: null,
  sessionStart: null,
  userGender: '',
  userAge: '',
  answers: [],
  currentScenarioId: '',
})

const isBrowser = typeof window !== 'undefined'

const cloneState = (state) => ({
  sessionId: state.sessionId,
  sessionStart: state.sessionStart,
  userGender: state.userGender,
  userAge: state.userAge,
  answers: Array.isArray(state.answers) ? state.answers.map((answer) => ({ ...answer })) : [],
  currentScenarioId: state.currentScenarioId,
})

const loadPersistedState = () => {
  if (!isBrowser) {
    return createInitialState()
  }

  try {
    const rawState = sessionStorageHelper.readStorageValue(window.sessionStorage, STORAGE_KEY)
    if (!rawState) {
      return createInitialState()
    }

    const parsedState = JSON.parse(rawState)

    return {
      ...createInitialState(),
      sessionId: parsedState?.sessionId ?? null,
      sessionStart: parsedState?.sessionStart ?? null,
      userGender: parsedState?.userGender ?? '',
      userAge: parsedState?.userAge ?? '',
      answers: Array.isArray(parsedState?.answers) ? parsedState.answers : [],
      currentScenarioId: parsedState?.currentScenarioId ?? '',
    }
  } catch (error) {
    console.error('Kon de sessiestatus niet herstellen.', error)
    return createInitialState()
  }
}

const sessionState = reactive(loadPersistedState())

let startSessionPromise = null
let completeSessionPromise = null

const persistState = () => {
  if (!isBrowser) {
    return
  }

  try {
    sessionStorageHelper.writeStorageValue(window.sessionStorage, STORAGE_KEY, JSON.stringify(cloneState(sessionState)))
  } catch (error) {
    console.error('Kon de sessiestatus niet opslaan.', error)
  }
}

const clearActiveSessionState = () => {
  sessionState.sessionId = null
  sessionState.sessionStart = null
  sessionState.answers = []
  sessionState.currentScenarioId = ''
  persistState()
}

const setUserProfile = ({ userAge = '', userGender = '' } = {}) => {
  sessionState.userAge = userAge
  sessionState.userGender = userGender
  persistState()
}

const startSession = async ({ scenarioId } = {}) => {
  if (startSessionPromise) {
    return startSessionPromise
  }

  if (sessionState.sessionId) {
    if (!sessionState.currentScenarioId || String(sessionState.currentScenarioId) === String(scenarioId ?? '')) {
      return sessionState.sessionId
    }

    console.error('Er is al een actieve sessie voor een ander scenario.')
    return sessionState.sessionId
  }

  startSessionPromise = (async () => {
    const sessionStart = new Date().toISOString()

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        session_start: sessionStart,
        completed: false,
        user_gender: sessionState.userGender || null,
        user_age: sessionState.userAge || null,
      })
      .select('id')
      .single()

    if (error) {
      throw error
    }

    sessionState.sessionId = data.id
    sessionState.sessionStart = sessionStart
    sessionState.currentScenarioId = String(scenarioId ?? '')
    sessionState.answers = []
    persistState()

    return data.id
  })()

  try {
    return await startSessionPromise
  } catch (error) {
    console.error('Kon de sessie niet starten.', error)
    throw error
  } finally {
    startSessionPromise = null
  }
}

const addAnswer = ({ sceneId, answerType, answerValue } = {}) => {
  if (!sessionState.sessionId) {
    console.error('Kon antwoord niet opslaan zonder actieve sessie.')
    return false
  }

  if (sceneId == null) {
    console.error('Kon antwoord niet opslaan zonder scene-id.')
    return false
  }

  const normalizedAnswerValue = String(answerValue ?? '')
  if (answerType === 'text' && !normalizedAnswerValue.trim()) {
    return false
  }

  sessionState.answers.push({
    scene_id: sceneId,
    answer_type: answerType,
    answer_value: normalizedAnswerValue,
  })
  persistState()

  return true
}

const completeSession = async () => {
  if (completeSessionPromise) {
    return completeSessionPromise
  }

  if (!sessionState.sessionId) {
    console.error('Kon de sessie niet afronden zonder actieve sessie.')
    return false
  }

  completeSessionPromise = (async () => {
    const sessionEnd = new Date().toISOString()
    const startTime = sessionState.sessionStart ? new Date(sessionState.sessionStart) : null
    const durationSeconds = startTime instanceof Date && !Number.isNaN(startTime.getTime())
      ? Math.max(0, Math.round((new Date(sessionEnd) - startTime) / 1000))
      : null

    const { error: sessionUpdateError } = await supabase
      .from('sessions')
      .update({
        session_end: sessionEnd,
        duration_seconds: durationSeconds,
        completed: true,
      })
      .eq('id', sessionState.sessionId)

    if (sessionUpdateError) {
      throw sessionUpdateError
    }

    if (sessionState.answers.length) {
      const answersPayload = sessionState.answers.map((answer) => ({
        session_id: sessionState.sessionId,
        scene_id: answer.scene_id,
        answer_type: answer.answer_type,
        answer_value: answer.answer_value,
        created_at: sessionEnd,
      }))

      const { error: answerInsertError } = await supabase
        .from('session_answers')
        .insert(answersPayload)

      if (answerInsertError) {
        throw answerInsertError
      }
    }

    clearActiveSessionState()
    return true
  })()

  try {
    return await completeSessionPromise
  } catch (error) {
    console.error('Kon de sessie niet afronden.', error)
    throw error
  } finally {
    completeSessionPromise = null
  }
}

sessionState.setUserProfile = setUserProfile
sessionState.startSession = startSession
sessionState.addAnswer = addAnswer
sessionState.completeSession = completeSession

export const useSessionStore = () => sessionState
