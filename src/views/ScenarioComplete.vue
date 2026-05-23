<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { useSessionStore } from '@/stores/sessionStore'

const router = useRouter()
const sessionStore = useSessionStore()
const completionError = ref('')
const isCompleting = ref(false)

const complete = async () => {
  if (isCompleting.value) {
    return
  }

  try {
    isCompleting.value = true
    completionError.value = ''

    if (sessionStore.sessionId) {
      await sessionStore.completeSession()
    }

    router.push('/scenario-lijst')
  } catch (error) {
    console.error(error)
    completionError.value = 'Kon de sessie niet afronden. Probeer opnieuw.'
  } finally {
    isCompleting.value = false
  }
}

const learnings = [
  'Respecteer een "nee", ook online',
  'Let op signalen in het gesprek',
  'Je hoeft niemand te overtuigen',
  'Geef iemand de nodige ruimte',
  'Denk na over hoe jouw berichten kunnen overkomen',
  'Blijf respectvol, ook als je teleurgesteld bent',
  'Grenzen werken in twee richtingen',
]
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/scenario-lijst" />
    <section class="content-wrap">
      <h1>Je hebt het scenario afgerond!</h1>
      <p>Goed gedaan! Je hebt scenario 1 succesvol afgerond. Bedankt voor je deelname.</p>
      <p>Heb je nog vragen? Aarzel niet om de moderator aan te spreken.</p>
      <p v-if="completionError" class="error-message">{{ completionError }}</p>
      <ul>
        <li v-for="learning in learnings" :key="learning">{{ learning }}</li>
      </ul>
      <SecondaryButton :text="isCompleting ? 'Bezig met afronden...' : 'Afronden'" @click="complete" />
    </section>
  </main>
</template>

<style scoped>
.error-message {
  color: var(--error-600);
}
</style>
