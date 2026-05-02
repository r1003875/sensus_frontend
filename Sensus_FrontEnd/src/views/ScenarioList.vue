<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import ScenarioCard from '@/components/ScenarioCard.vue'
import { fetchScenarios } from '@/services/api'

const router = useRouter()

const scenarios = ref([])
const loading = ref(true)
const error = ref(null)

const loadScenarios = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await fetchScenarios()
    scenarios.value = data
  } catch (err) {
    error.value = 'Failed to load scenarios. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const startScenario = (scenario) => {
  // Pass scenario data via route params or state
  router.push({
    name: 'intro-scenario',
    params: { id: scenario.id },
    state: { scenario }
  })
}

onMounted(() => {
  loadScenarios()
})
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/content-warning" />
    <section class="content-wrap content-wrap--wide">
      <h1>Scenario's</h1>
      <p>Kies een situatie die je wil verkennen</p>

      <div v-if="loading" class="loading-message">
        <p>Bezig met laden van scenario's...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button class="primary-btn" @click="loadScenarios">Probeer opnieuw</button>
      </div>

      <div v-else-if="scenarios.length" class="scenario-grid">
        <ScenarioCard
          v-for="s in scenarios"
          :key="s.id"
          :title="s.title"
          :description="s.desc"
          :tag="s.tag"
          @start="startScenario(s)"
        />
      </div>

      <div v-else class="empty-message">
        <p>Geen scenario's beschikbaar.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.loading-message,
.error-message,
.empty-message {
  padding: 24px;
  text-align: center;
}

.error-message {
  color: #ba1414;
}

.error-message button {
  margin-top: 12px;
}
</style>
