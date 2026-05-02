<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const router = useRouter()

const startScenario = () => router.push('/safe-exit')
const pauseScenario = () => router.push('/safe-exit')
</script>

<template>
  <main class="app-screen">
    <TopNav />
    <section class="content-wrap">
      <h1>Online gesprek loopt vast</h1>
      <p>Je stuurt je crush berichten. Het gesprek komt maar moeilijk op gang.</p>
      <PrimaryButton text="Start" @click="startScenario" />
      <small>Dit scenario duurt ongeveer 2-3 minuten.</small>
      <SecondaryButton text="Pauzeer scenario" @click="pauseScenario" />
    </section>
  </main>
</template>
