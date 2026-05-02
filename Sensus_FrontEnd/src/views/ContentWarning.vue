<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()

const goNext = () => router.push('/scenario-lijst')
</script>

<template>
  <main class="app-screen">
    <TopNav />
    <section class="content-wrap">
      <h1>Voor je begint</h1>
      <p>Deze tool toont situaties die gaan over grenzen, communicatie en online gedrag. Sommige momenten kunnen gevoelig aanvoelen. Je kunt altijd stoppen.</p>
      <PrimaryButton text="Ik begrijp het" @click="goNext" />
    </section>
  </main>
</template>
