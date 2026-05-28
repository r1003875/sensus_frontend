<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { useSessionStore } from '@/stores/sessionStore'

const router = useRouter()
const sessionStore = useSessionStore()
const stopError = ref('')
const isStopping = ref(false)

const resumeRoute = computed(() => sessionStore.getResumeRoute())
const backTo = computed(() => {
  if (!resumeRoute.value) {
    return '/scenario-lijst'
  }

  return router.resolve(resumeRoute.value).fullPath
})

const continue_ = async () => {
  if (!resumeRoute.value) {
    await router.push('/scenario-lijst')
    return
  }

  sessionStore.clearPausedState()
  await router.push(resumeRoute.value)
}

const stop = async () => {
  if (isStopping.value) {
    return
  }

  try {
    isStopping.value = true
    stopError.value = ''
    await sessionStore.discardSession()
    await router.replace('/scenario-lijst')
  } catch (error) {
    console.error(error)
    stopError.value = 'Kon de sessie niet stoppen. Probeer opnieuw.'
  } finally {
    isStopping.value = false
  }
}
</script>

<template>
  <main class="app-screen">
    <TopNav :backTo="backTo" />
    <section class="content-wrap">
      <img src="../assets/icons/fi-rr-pause-purple.svg" alt="Pause icon" class="warning-icon" />
      <h1>Even pauze?</h1>
      <p>Je hoeft niet verder te gaan als het niet goed voelt. Neem een moment voor jezelf. Je kan altijd later opnieuw starten.</p>
      <small>Er wordt niets opgeslagen.</small>
      <p v-if="stopError" class="error-message">{{ stopError }}</p>
      <PrimaryButton text="Ga verder" @click="continue_" />
      <SecondaryButton :text="isStopping ? 'Stoppen...' : 'Stop'" @click="stop" />
    </section>
  </main>
</template>

<style scoped>
.error-message {
  color: var(--error-600);
}
</style>
