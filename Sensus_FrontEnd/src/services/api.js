const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN || ''

const normalizeScenario = (item) => {
  const source = item?.attributes ?? item ?? {}

  return {
    id: item?.id,
    title: source.title,
    desc: source.description,
    tag: source.context,
    min_age: source.age_min,
    max_age: source.age_max,
    is_active: source.is_active,
    raw: item,
  }
}

const normalizeScenarioList = (payload) => {
  let scenarios = []

  if (Array.isArray(payload)) {
    scenarios = payload.map(normalizeScenario)
  } else if (Array.isArray(payload?.data)) {
    scenarios = payload.data.map(normalizeScenario)
  } else if (Array.isArray(payload?.scenarios)) {
    scenarios = payload.scenarios.map(normalizeScenario)
  }

  // Filter out inactive scenarios
  return scenarios.filter((scenario) => scenario.is_active !== false)
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
