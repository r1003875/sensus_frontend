const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN || ''

const buildScenarioScenesQuery = () => {
  const params = new URLSearchParams()
  params.set('populate[scenes][populate][content_media]', 'true')
  params.set('populate[scenes][populate][choices][populate][to_scenes]', 'true')

  return params.toString()
}

const normalizeScenario = (item) => {
  const source = item?.attributes ?? item ?? {}

  return {
    documentId: item?.documentId ?? source?.documentId ?? '',
    title: source.title,
    desc: source.description,
    tag: source.context,
    min_age: source.age_min,
    max_age: source.age_max,
    is_active: source.is_active,
    raw: item,
  }
}

const normalizeScene = (item) => {
  const source = item?.attributes ?? item ?? {}

  const extractRelationItems = (relation) => {
    if (Array.isArray(relation?.data)) {
      return relation.data
    }

    if (Array.isArray(relation)) {
      return relation
    }

    return []
  }

  const extractRelationId = (relation) => {
    if (relation == null) {
      return null
    }

    if (typeof relation === 'string' || typeof relation === 'number') {
      return relation
    }

    const relationSource = relation?.attributes ?? relation ?? {}
    return relation?.id ?? relationSource?.id ?? null
  }

  const extractText = (value) => {
    if (typeof value === 'string') {
      return value
    }

    if (Array.isArray(value)) {
      return value
        .map((entry) => extractText(entry))
        .filter(Boolean)
        .join('\n')
    }

    if (value && typeof value === 'object') {
      if (typeof value.text === 'string') {
        return value.text
      }

      if (Array.isArray(value.children)) {
        return value.children
          .map((child) => extractText(child))
          .filter(Boolean)
          .join(' ')
      }
    }

    return ''
  }

  const normalizeChoice = (choice) => {
    const choiceSource = choice?.attributes ?? choice ?? {}
    const toScenes = extractRelationItems(choiceSource?.to_scenes).map(extractRelationId).filter((id) => id != null)

    return {
      id: choice?.id ?? choiceSource?.id ?? null,
      label: typeof choiceSource?.label === 'string' ? choiceSource.label : null,
      scene: extractRelationId(choiceSource?.scene?.data ?? choiceSource?.scene),
      to_scenes: toScenes,
      input_field: Boolean(choiceSource?.input_field),
      raw: choice,
    }
  }

  const choiceItems = extractRelationItems(source?.choices)

  return {
    id: item?.id ?? source?.id,
    order_index: Number(source?.order_index ?? 0),
    title: extractText(source?.title),
    content_text: extractText(source?.content_text),
    content_media: source?.content_media?.data ?? source?.content_media ?? null,
    question: extractText(source?.question?.text ?? source?.question_text ?? source?.question),
    reflection_scene: Boolean(source?.reflection_scene),
    choices: choiceItems.map(normalizeChoice),
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

  // Keep active scenarios that can be fetched by Strapi documentId.
  return scenarios.filter((scenario) => scenario.is_active !== false && Boolean(scenario.documentId))
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

export const fetchScenario = async (documentId) => {
  if (!documentId) {
    throw new Error('Missing scenario documentId')
  }

  try {
    const response = await fetch(`${API_BASE}/scenarios/${encodeURIComponent(documentId)}`, {
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
    console.error(`Failed to fetch scenario ${documentId}:`, error)
    throw error
  }
}

export const fetchScenarioScenes = async (scenarioDocumentId) => {
  if (!scenarioDocumentId) {
    throw new Error('Missing scenario documentId')
  }

  try {
    const query = buildScenarioScenesQuery()
    const response = await fetch(
      `${API_BASE}/scenarios/${encodeURIComponent(scenarioDocumentId)}?${query}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          Accept: 'application/json',
        }
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const payload = await response.json()
    const scenarioData = payload?.data ?? payload
    const scenesRelation = scenarioData?.attributes?.scenes ?? scenarioData?.scenes

    let scenes = []
    if (Array.isArray(scenesRelation?.data)) {
      scenes = scenesRelation.data
    } else if (Array.isArray(scenesRelation)) {
      scenes = scenesRelation
    }

    return scenes
      .map(normalizeScene)
      .sort((a, b) => a.order_index - b.order_index)
  } catch (error) {
    console.error(`Failed to fetch scenes for scenario ${scenarioDocumentId}:`, error)
    throw error
  }
}
