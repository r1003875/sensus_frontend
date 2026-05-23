<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { fetchScenarioScenes } from '@/services/api'
import { useSessionStore } from '@/stores/sessionStore'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const CMS_ORIGIN = API_BASE.replace(/\/api\/?$/, '')

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

const scenes = ref([])
const loading = ref(true)
const error = ref(null)
const choiceInputs = ref({})
const choiceInputErrors = ref({})

const scenarioDocumentId = computed(() => String(route.params.documentId || ''))
const sceneIndex = computed(() => Number(route.params.sceneIndex || 1))

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

const resolveMediaUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return ''
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `${CMS_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`
}

const mediaUrl = computed(() => resolveMediaUrl(currentScene.value?.content_media))

const getChoiceKey = (choice, choiceIndex) => String(choice?.id ?? `${currentScene.value?.id ?? sceneIndex.value}-${choiceIndex}`)

const navigateToSceneId = (targetSceneId) => {
  const targetIndex = scenes.value.findIndex((scene) => String(scene.id) === String(targetSceneId))

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

const handleChoice = (choice, choiceIndex) => {
  const choiceKey = getChoiceKey(choice, choiceIndex)
  const sceneId = currentScene.value?.id

  if (choice?.input_field) {
    const value = String(choiceInputs.value[choiceKey] ?? '').trim()

    if (!value) {
      choiceInputErrors.value[choiceKey] = 'Vul eerst een antwoord in om verder te gaan.'
      return
    }

    choiceInputErrors.value[choiceKey] = ''

    const stored = sessionStore.addAnswer({
      sceneId,
      answerType: 'text',
      answerValue: value,
    })

    if (!stored) {
      error.value = 'Kon het antwoord niet opslaan.'
      return
    }
  }

  const nextSceneId = Array.isArray(choice?.to_scenes) ? choice.to_scenes[0] : null

  if (!choice?.input_field) {
    const stored = sessionStore.addAnswer({
      sceneId,
      answerType: 'choice',
      answerValue: choice?.label || 'Ga verder',
    })

    if (!stored) {
      error.value = 'Kon de keuze niet opslaan.'
      return
    }
  }

  if (nextSceneId != null && nextSceneId !== '') {
    navigateToSceneId(nextSceneId)
    return
  }

  if (currentScene.value?.reflection_scene) {
    router.push('/einde')
    return
  }

  error.value = 'Deze keuze heeft geen vervolgstap.'
}

const loadScenes = async () => {
  try {
    loading.value = true
    error.value = null

    const data = await fetchScenarioScenes(scenarioDocumentId.value)
    scenes.value = data

    if (!data.length) {
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
            <template v-if="choice.input_field">
              <textarea
                v-model="choiceInputs[getChoiceKey(choice, choiceIndex)]"
                class="scene-choice-input"
                rows="4"
                placeholder="Typ hier je antwoord"
              />
              <p v-if="choiceInputErrors[getChoiceKey(choice, choiceIndex)]" class="choice-input-error">
                {{ choiceInputErrors[getChoiceKey(choice, choiceIndex)] }}
              </p>
              <PrimaryButton text="Ga verder" @click="handleChoice(choice, choiceIndex)" />
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
