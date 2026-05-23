<script setup>
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()

const startApp = () => router.push('/code')
</script>

<template>
  <main class="app-screen">
    <section class="start-screen">
      <div class="start-screen__logo">
        <img src="../assets/images/sensus-logo.svg" alt="Sensus Logo" />
      </div>
      <h1>Oefen met grenzen en consent</h1>
      <p>Ontdek realistische situaties en leer hoe jij op een veilige, respectvolle manier kan reageren.</p>
      <PrimaryButton text="Start" @click="startApp" />
    </section>
  </main>
</template>
