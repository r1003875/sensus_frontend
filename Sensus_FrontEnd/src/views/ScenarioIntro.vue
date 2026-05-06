<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { fetchScenario } from '@/services/api'

const router = useRouter()
const route = useRoute()

const scenario = ref(history.state?.scenario || {
  title: 'Online gesprek loopt vast',
  desc: 'Je stuurt je crush berichten. Het gesprek komt maar moeilijk op gang.',
  duration: '2-3 minuten'
})

const startScenario = () => {
  const scenarioDocumentId = route.params.documentId || scenario.value?.documentId
  if (!scenarioDocumentId) {
    router.push('/404')
    return
  }

  router.push({
    name: 'scenario-scene',
    params: { documentId: scenarioDocumentId, sceneIndex: 1 },
  })
}

const pauseScenario = () => router.push('/safe-exit')

onMounted(async () => {
  const scenarioDocumentId = route.params.documentId
  if (!scenarioDocumentId || scenario.value?.documentId) {
    return
  }

  try {
    scenario.value = await fetchScenario(scenarioDocumentId)
  } catch (error) {
    console.error(error)
    router.push('/405')
  }
})
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/scenario-lijst" />
    <section class="content-wrap">
      <h1>{{ scenario.title }}</h1>
      <p>{{ scenario.desc }}</p>
      <PrimaryButton text="Start" @click="startScenario" />
      <small>Dit scenario duurt ongeveer {{ scenario.duration || '2-3 minuten' }}.</small>
      <SecondaryButton text="Pauzeer scenario" @click="pauseScenario" />
    </section>
  </main>
</template>
