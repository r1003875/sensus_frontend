<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'

const route = useRoute()
const router = useRouter()

const backTo = computed(() => (typeof route.query.backTo === 'string' && route.query.backTo) || '/')

const goPrivacy = () => router.push({ path: '/privacybeleid', query: { backTo: backTo.value } })
const goTerms = () => router.push({ path: '/gebruikersvoorwaarden', query: { backTo: backTo.value } })
</script>

<template>
  <main class="app-screen">
    <TopNav :backTo="backTo" />
    <section class="content-wrap">
      <h1>FAQ</h1>
      <h2>Hoe werkt deze tool?</h2>
      <p>Om meer te leren over grenzen en consent kun je in deze applicatie scenario's starten. Er zijn verschillende scenario's over verschillende onderwerpen.</p>
      <h2>Waarom moet ik mijn leeftijd en gender invullen?</h2>
      <p>We gebruiken deze informatie uitsluitend voor analytische doeleinden. Zo krijgen we een beter beeld van het gedrag van jongeren met betrekking tot consent.</p>
      <h2>Contact</h2>
      <p>Neem contact met ons op via sensus-app@outlook.com</p>
      <p>
        <a href="#" @click.prevent="goPrivacy">privacybeleid</a> - <a href="#" @click.prevent="goTerms">gebruikersvoorwaarden</a>
      </p>
    </section>
  </main>
</template>
