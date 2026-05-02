<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const router = useRouter()
const route = useRoute()

// Get scenario from route state or fallback to default
const scenario = computed(() => history.state?.scenario || {
  title: 'Online gesprek loopt vast',
  desc: 'Je stuurt je crush berichten. Het gesprek komt maar moeilijk op gang.',
  duration: '2-3 minuten'
})

const startScenario = () => router.push('/404')
const pauseScenario = () => router.push('/safe-exit')
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
