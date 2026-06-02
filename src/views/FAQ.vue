<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import { useSessionStore } from '@/stores/sessionStore'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

const backTo = computed(() => {
  if (typeof route.query.backTo === 'string' && route.query.backTo) {
    return route.query.backTo
  }

  const lastScenarioLocation = sessionStore.getLastScenarioLocation?.()
  if (lastScenarioLocation) {
    return router.resolve(lastScenarioLocation).fullPath
  }

  return '/scenario-lijst'
})

const goPrivacy = () => router.push({ path: '/privacybeleid', query: { backTo: backTo.value } })
const goTerms = () => router.push({ path: '/gebruikersvoorwaarden', query: { backTo: backTo.value } })
</script>

<template>
  <main class="app-screen">
    <TopNav :back-to="backTo" />
    <section class="content-wrap">
      <h1>FAQ</h1>
      <h2>Hoe werkt deze tool?</h2>
      <p>Om meer te leren over grenzen en consent kun je in deze applicatie scenario's starten. Er zijn verschillende scenario's over verschillende onderwerpen.</p>
      <p>In die scenario’s moet je vragen beantwoorden en situaties beoordelen. Jouw keuzes kunnen een impact hebben op het gevolg van het scenario.</p>
      <h2>Waarom moet ik mijn leeftijd en gender invullen?</h2>
      <p>We gebruiken deze informatie uitsluitend voor analytische doeleinden. Zo krijgen we een beter beeld van het gedrag van jongeren met betrekking tot consent.</p>
      <p>Je deelname blijft dus anoniem.</p>
      <h2>Contact</h2>
      <p>Heb je vragen of feedback?</p>
      <p>Neem contact met ons op via <a href="mailto:sensus-app@outlook.com">sensus-app@outlook.com</a></p>
      <p class="small-text">
        <a href="#" @click.prevent="goPrivacy">privacybeleid</a> <a href="#" @click.prevent="goTerms">gebruikersvoorwaarden</a>
      </p>
    </section>
  </main>
</template>

<style scoped>
.small-text {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>