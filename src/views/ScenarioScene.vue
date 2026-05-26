<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { fetchScenario, fetchScenarioScenes } from '@/services/api'
import { useSessionStore } from '@/stores/sessionStore'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const CMS_ORIGIN = API_BASE.replace(/\/api\/?$/, '')

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

const scenes = ref([])
const scenario = ref(null)
const loading = ref(true)
const error = ref(null)
const choiceInputs = ref({})
const choiceInputErrors = ref({})
const routingLoading = ref(false)

const scenarioDocumentId = computed(() => String(route.params.documentId || ''))
const sceneIndex = computed(() => Number(route.params.sceneIndex || 1))
const scenarioTitle = computed(() => String(scenario.value?.title || ''))

const getSceneById = (sceneId) => scenes.value.find((scene) => String(scene.documentId ?? scene.id) === String(sceneId)) ?? null

const currentScene = computed(() => {
  const index = sceneIndex.value - 1
  if (index < 0 || index >= scenes.value.length) {
    return null
  }

  return scenes.value[index]
})

const currentSceneChoices = computed(() => {
  if (!Array.isArray(currentScene.value?.choices)) {
    return []
  }

  return currentScene.value.choices
})

const getChoiceInputValue = (choice, choiceIndex) => String(choiceInputs.value[getChoiceKey(choice, choiceIndex)] ?? '')

const getChoiceTargets = (choice) => {
  if (!Array.isArray(choice?.to_scenes)) {
    return []
  }

  return choice.to_scenes
    .map((targetSceneId, targetIndex) => {
      const targetScene = getSceneById(targetSceneId)

      return {
        id: targetIndex + 1,
        sceneId: targetSceneId,
        label: targetScene?.title || `Scene ${targetIndex + 1}`,
      }
    })
    .filter((choiceItem) => choiceItem.sceneId != null && choiceItem.sceneId !== '')
}

const hasMultipleTargets = (choice) => getChoiceTargets(choice).length > 1

const shouldShowAnswerBox = (choice) => Boolean(choice?.input_field) || hasMultipleTargets(choice)

const resolveMediaUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return ''
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `${CMS_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`
}

const mediaUrl = computed(() => {
  const media = currentScene.value?.content_media

  if (!media) {
    return ''
  }

  if (typeof media === 'string') {
    return resolveMediaUrl(media)
  }

  const mediaUrlValue = media?.url ?? media?.data?.attributes?.url ?? ''

  return resolveMediaUrl(mediaUrlValue)
})

const getChoiceKey = (choice, choiceIndex) => String(choice?.id ?? `${currentScene.value?.id ?? sceneIndex.value}-${choiceIndex}`)

const navigateToSceneId = (targetSceneId) => {
  const targetIndex = scenes.value.findIndex((scene) => String(scene.documentId ?? scene.id) === String(targetSceneId))

  if (targetIndex < 0) {
    error.value = 'Kon de volgende scene niet vinden.'
    return
  }

  router.push({
    name: 'scenario-scene',
    params: {
      documentId: scenarioDocumentId.value,
      sceneIndex: targetIndex + 1,
    },
  })
}

const saveCurrentAnswer = (sceneId, answerType, answerValue) => {
  const stored = sessionStore.addAnswer({
    sceneId,
    answerType,
    answerValue,
  })

  if (!stored) {
    error.value = 'Kon het antwoord niet opslaan.'
    return false
  }

  return true
}

const routeViaAi = async ({ choice, userInput }) => {
  const targets = getChoiceTargets(choice)

  if (!targets.length) {
    error.value = 'Deze keuze heeft geen vervolgstap.'
    return
  }

  const sceneId = currentScene.value?.id
  const stored = saveCurrentAnswer(sceneId, 'text', userInput)

  if (!stored) {
    return
  }

  const requestBody = {
    userInput,
    question: String(currentScene.value?.question || ''),
    context: scenarioTitle.value,
    choices: targets.map(({ id, label }) => ({ id, label })),
  }

  routingLoading.value = true

  try {
    const response = await fetch('https://sensus-cms.onrender.com/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`AI routing API error: ${response.status}`)
    }

    const payload = await response.json()
    const selectedChoiceId = Number(payload?.choice_id)
    const selectedTarget = targets.find((target) => target.id === selectedChoiceId) ?? targets[0]

    if (!payload?.success || !selectedTarget) {
      throw new Error('AI routing response was not usable.')
    }

    navigateToSceneId(selectedTarget.sceneId)
  } catch (routeError) {
    console.error('AI routing failed, falling back to the first scene.', routeError)
    navigateToSceneId(targets[0].sceneId)
  } finally {
    routingLoading.value = false
  }
}

const handleChoice = (choice, choiceIndex) => {
  const choiceKey = getChoiceKey(choice, choiceIndex)
  const sceneId = currentScene.value?.id
  const targets = getChoiceTargets(choice)
  const typedAnswer = getChoiceInputValue(choice, choiceIndex).trim()

  if (!targets.length) {
    if (choice?.input_field && !typedAnswer) {
      choiceInputErrors.value[choiceKey] = 'Vul eerst een antwoord in om verder te gaan.'
      return
    }

    const stored = choice?.input_field
      ? saveCurrentAnswer(sceneId, 'text', typedAnswer)
      : saveCurrentAnswer(sceneId, 'choice', choice?.label || 'Ga verder')

    if (!stored) {
      return
    }

    if (currentScene.value?.reflection_scene) {
      router.push('/einde')
    }

    return
  }

  if (targets.length > 1) {
    if (!typedAnswer) {
      choiceInputErrors.value[choiceKey] = 'Vul eerst een antwoord in om verder te gaan.'
      return
    }

    choiceInputErrors.value[choiceKey] = ''
    routeViaAi({ choice, userInput: typedAnswer })
    return
  }

  const nextSceneId = targets[0]?.sceneId ?? null
  if (choice?.input_field && !typedAnswer) {
    choiceInputErrors.value[choiceKey] = 'Vul eerst een antwoord in om verder te gaan.'
    return
  }

  const stored = choice?.input_field
    ? saveCurrentAnswer(sceneId, 'text', typedAnswer)
    : saveCurrentAnswer(sceneId, 'choice', choice?.label || 'Ga verder')

  if (!stored) {
    return
  }

  if (nextSceneId != null && nextSceneId !== '') {
    navigateToSceneId(nextSceneId)
    return
  }

  if (choice?.input_field || currentScene.value?.reflection_scene) {
    return
  }

  error.value = 'Deze keuze heeft geen vervolgstap.'
}

const loadScenes = async () => {
  try {
    loading.value = true
    error.value = null

    const [scenarioData, sceneData] = await Promise.all([
      fetchScenario(scenarioDocumentId.value),
      fetchScenarioScenes(scenarioDocumentId.value),
    ])

    scenario.value = scenarioData
    scenes.value = sceneData

    if (!sceneData.length) {
      error.value = 'Geen scenes gevonden voor dit scenario.'
      return
    }

    if (!currentScene.value) {
      router.push('/404')
    }
  } catch (err) {
    error.value = 'Kon de scenes niet laden. Probeer opnieuw.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(
  () => [route.params.documentId, route.params.sceneIndex],
  async ([documentId, currentSceneIndex]) => {
    choiceInputErrors.value = {}

    if (!documentId) {
      router.push('/404')
      return
    }

    if (Number.isNaN(Number(currentSceneIndex))) {
      router.push('/404')
      return
    }

    await loadScenes()
  },
  { immediate: true }
)

onMounted(async () => {
  if (!scenarioDocumentId.value) {
    router.push('/404')
  }
})
</script>

<template>
  <main class="app-screen">
    <TopNav :backTo="`/intro-scenario/${scenarioDocumentId}`" />
    <section class="content-wrap">
      <p v-if="loading">Scenes worden geladen...</p>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>

      <template v-else-if="currentScene">
        <h1>{{ currentScene.title }}</h1>
        <p>{{ currentScene.content_text }}</p>

        <img
          v-if="mediaUrl"
          :src="mediaUrl"
          :alt="currentScene.title || 'Scene media'"
          class="scene-media"
        />

        <section v-if="currentScene.question" class="scene-question">
          <h2>Vraag</h2>
          <p>{{ currentScene.question }}</p>
        </section>

        <section v-if="currentSceneChoices.length" class="scene-choices">
          <div
            v-for="(choice, choiceIndex) in currentSceneChoices"
            :key="getChoiceKey(choice, choiceIndex)"
            class="scene-choice"
          >
            <template v-if="shouldShowAnswerBox(choice)">
              <textarea
                v-model="choiceInputs[getChoiceKey(choice, choiceIndex)]"
                class="scene-choice-input"
                rows="4"
                placeholder="Typ hier je antwoord"
                :disabled="routingLoading"
              />
              <p v-if="choiceInputErrors[getChoiceKey(choice, choiceIndex)]" class="choice-input-error">
                {{ choiceInputErrors[getChoiceKey(choice, choiceIndex)] }}
              </p>
              <button
                type="button"
                class="primary-btn scene-choice-action"
                :disabled="routingLoading || !getChoiceInputValue(choice, choiceIndex).trim()"
                @click="handleChoice(choice, choiceIndex)"
              >
                {{ routingLoading ? 'Bezig...' : 'Ga verder' }}
              </button>
            </template>

            <PrimaryButton
              v-else
              :text="choice.label || 'Ga verder'"
              @click="handleChoice(choice, choiceIndex)"
            />
          </div>
        </section>
      </template>
    </section>
  </main>
</template>

<style scoped>
.scene-choices {
  margin-top: 20px;
  display: grid;
  gap: 16px;
}

.scene-choice {
  display: grid;
  gap: 10px;
}

.scene-choice-input {
  width: 100%;
  min-height: 120px;
  resize: vertical;
  padding: 12px;
  border: 1px solid var(--neutral-300);
  border-radius: 12px;
  background: var(--neutral-100);
  color: inherit;
  font: inherit;
}

.scene-choice-input:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

.scene-choice-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.scene-choice-action:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.choice-input-error {
  margin: 0;
  color: var(--error-600);
  font-size: 14px;
}

.scene-media {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.scene-question {
  padding: 16px;
  border: 1px solid var(--neutral-300);
  border-radius: 12px;
  background: var(--neutral-100);
}

.scene-question h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.error-message {
  color: var(--error-600);
}
</style>
