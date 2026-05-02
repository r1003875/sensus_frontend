const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN || ''

const normalizeScenario = (item) => {
  const source = item?.attributes ?? item ?? {}

  return {
    id: item?.id ?? item?.documentId ?? source.id ?? source.documentId ?? source.slug ?? source.title,
    title: source.title ?? source.name ?? source.titel ?? 'Onbekend scenario',
    desc: source.desc ?? source.description ?? source.intro ?? source.summary ?? '',
    tag: source.tag ?? source.category?.name ?? source.category ?? '',
    duration: source.duration ?? source.length ?? source.durationText ?? '',
    raw: item,
  }
}

const normalizeScenarioList = (payload) => {
  if (Array.isArray(payload)) {
    return payload.map(normalizeScenario)
  }

  if (Array.isArray(payload?.data)) {
    return payload.data.map(normalizeScenario)
  }

  if (Array.isArray(payload?.scenarios)) {
    return payload.scenarios.map(normalizeScenario)
  }

  return []
}

export const fetchScenarios = async () => {
  try {
    const response = await fetch(`${API_BASE}/scenarios`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: 'application/json',
      }
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    const payload = await response.json()
    return normalizeScenarioList(payload)
  } catch (error) {
    console.error('Failed to fetch scenarios:', error)
    throw error
  }
}

export const fetchScenario = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/scenarios/${id}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: 'application/json',
      }
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    const payload = await response.json()
    return normalizeScenario(payload?.data ?? payload)
  } catch (error) {
    console.error(`Failed to fetch scenario ${id}:`, error)
    throw error
  }
}
