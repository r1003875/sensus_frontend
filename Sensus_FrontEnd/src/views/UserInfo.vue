<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()

const goNext = () => router.push('/content-warning')
</script>

<template>
  <main class="app-screen">
    <TopNav />
    <section class="content-wrap">
      <h1>Informatie over jou</h1>
      <p>We gebruiken deze gegevens alleen voor het analyseren van data. Zo krijgen wij een beter beeld over gedrag van jongeren op vlak van toestemming.</p>
      <small class="required">Verplicht*</small>
      <label>Leeftijd*</label>
      <select><option>Selecteer je leeftijd</option></select>
      <label>Gender*</label>
      <select><option>Selecteer je gender</option></select>
      <p>Door verder te gaan ga je akkoord dat deze gegevens worden gebruikt voor het analyseren van data. Je deelname blijft volledig anoniem.</p>
      <PrimaryButton text="Ga verder" @click="goNext" />
    </section>
  </main>
</template>
