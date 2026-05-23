<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const router = useRouter()

const continue_ = () => router.push('/einde')
const stop = () => router.push('/scenario-lijst')
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/intro-scenario" />
    <section class="content-wrap">
      <h1>Even pauze?</h1>
      <p>Je hoeft niet verder te gaan als het niet goed voelt. Neem een moment voor jezelf. Je kan altijd later opnieuw starten.</p>
      <small>Er wordt niets opgeslagen.</small>
      <PrimaryButton text="Ga verder" @click="continue_" />
      <SecondaryButton text="Stop" @click="stop" />
    </section>
  </main>
</template>
