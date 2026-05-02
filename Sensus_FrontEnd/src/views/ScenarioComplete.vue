<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const router = useRouter()

const complete = () => router.push('/scenario-lijst')

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
    <TopNav />
    <section class="content-wrap">
      <h1>Je hebt het scenario afgerond!</h1>
      <p>Goed gedaan! Je hebt scenario 1 succesvol afgerond. Bedankt voor je deelname.</p>
      <p>Heb je nog vragen? Aarzel niet om de moderator aan te spreken.</p>
      <ul>
        <li v-for="learning in learnings" :key="learning">{{ learning }}</li>
      </ul>
      <SecondaryButton text="Afronden" @click="complete" />
    </section>
  </main>
</template>
