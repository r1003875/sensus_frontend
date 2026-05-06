<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { fetchScenarioScenes } from '@/services/api'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const CMS_ORIGIN = API_BASE.replace(/\/api\/?$/, '')

const route = useRoute()
const router = useRouter()

const scenes = ref([])
const loading = ref(true)
const error = ref(null)

const scenarioDocumentId = computed(() => String(route.params.documentId || ''))
const sceneIndex = computed(() => Number(route.params.sceneIndex || 1))

const currentScene = computed(() => {
  const index = sceneIndex.value - 1
  if (index < 0 || index >= scenes.value.length) {
    return null
  }

  return scenes.value[index]
})

const isFinalScene = computed(() => {
  if (!scenes.value.length) {
    return false
  }
  return sceneIndex.value === scenes.value.length
})

const nextButtonText = computed(() => (isFinalScene.value ? 'Rond scenario af' : 'Volgende'))

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

const goNext = () => {
  if (isFinalScene.value) {
    router.push('/einde')
    return
  }

  router.push({
    name: 'scenario-scene',
    params: {
      documentId: scenarioDocumentId.value,
      sceneIndex: sceneIndex.value + 1,
    },
  })
}

watch(
  () => [route.params.documentId, route.params.sceneIndex],
  async ([documentId]) => {
    if (!documentId) {
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

        <PrimaryButton :text="nextButtonText" @click="goNext" />
      </template>
    </section>
  </main>
</template>

<style scoped>
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
