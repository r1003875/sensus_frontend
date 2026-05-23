<script setup>
import TopNav from '@/components/TopNav.vue'
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/faq" />
    <section class="content-wrap" :class="{ 'content-wrap--long': true }">
      <h1>Gebruikersvoorwaarden</h1>
      <p>Deze gebruikersvoorwaarden zijn van toepassing op het gebruik van de applicatie Sensus. Door de applicatie te gebruiken gaat de gebruiker akkoord met deze voorwaarden.</p>
      <h2>Gebruik van de applicatie</h2>
      <p>De gebruiker verbindt zich ertoe de applicatie wettig en respectvol te gebruiken.</p>
      <h2>Inhoud van de applicatie</h2>
      <p>De inhoud is bedoeld voor educatieve en informatieve doeleinden en vervangt geen professioneel advies.</p>
      <h2>Contact</h2>
      <p>Bij vragen kan contact worden opgenomen via de contactgegevens in de applicatie.</p>
    </section>
  </main>
</template>
