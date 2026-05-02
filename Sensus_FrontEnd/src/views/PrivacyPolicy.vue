<script setup>
import TopNav from '@/components/TopNav.vue'
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/faq" />
    <section class="content-wrap" :class="{ 'content-wrap--long': true }">
      <h1>Privacybeleid</h1>
      <p>Dit privacybeleid beschrijft hoe Sensus persoonsgegevens verzamelt, gebruikt en beschermt.</p>
      <h2>Welke gegevens verzamelen wij?</h2>
      <p>Leeftijd en gender worden uitsluitend verzameld voor analytische en onderzoeksdoeleinden.</p>
      <h2>Beveiliging van gegevens</h2>
      <p>Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen.</p>
      <h2>Rechten van gebruikers</h2>
      <p>Omdat het gebruik van deze tool anoniem gebeurt, kunnen gegevens niet individueel worden opgevraagd of verwijderd.</p>
    </section>
  </main>
</template>
