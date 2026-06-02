<script setup>
import TopNav from '@/components/TopNav.vue'
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/faq" />
    <section class="content-wrap" :class="{ 'content-wrap--long': true }">
      <h1>Gebruikersvoorwaarden</h1>
      <h2>Algemeen</h2>
      <p>Deze gebruikersvoorwaarden zijn van toepassing op het gebruik van de applicatie Sensus. Door de applicatie te gebruiken gaat de gebruiker akkoord met deze voorwaarden. De applicatie heeft als doel jongeren te helpen reflecteren over sociale situaties en grensoverschrijdend gedrag aan de hand van interactieve scenario’s. De inhoud is bedoeld voor educatieve en informatieve doeleinden. Indien de gebruiker niet akkoord gaat met deze voorwaarden, dient hij of zij het gebruik van de applicatie stop te zetten.</p>
      <h2>Gebruik van de applicatie</h2>
      <p>De gebruiker verbindt zich ertoe de applicatie te gebruiken op een manier die:</p>
      <ul>
        <li>In overeenstemming is met de geldende wetgeving;</li>
        <li>Geen schade toebrengt aan andere gebruikers of derden;</li>
        <li>Het correct functioneren van de applicatie niet verstoort.</li>
      </ul>
      <p>Het is niet toegestaan om:</p>
      <ul>
        <li>De applicatie te gebruiken voor illegale doeleinden;</li>
        <li>Beveiligingsmaatregelen te omzeilen;</li>
        <li>De applicatie te misbruiken of te proberen de werking ervan te verstoren.</li>
      </ul>
      <h2>Inhoud van de applicatie</h2>
      <p>De scenario’s en andere inhoud in de applicatie zijn ontwikkeld met het oog op educatie en bewustmaking rond sociale interacties en grenzen. Hoewel de ontwikkelaars ernaar streven correcte en relevante informatie te bieden, kan niet worden gegarandeerd dat alle informatie volledig, actueel of foutloos is. De inhoud van de applicatie vervangt geen professioneel advies of begeleiding.</p>
      <h2>Verantwoordelijkheid van de gebruiker</h2>
      <p>De gebruiker is zelf verantwoordelijk voor zijn of haar keuzes en handelingen tijdens het gebruik van de applicatie. De applicatie biedt scenario’s en reflectiemomenten aan, maar het gebruik ervan gebeurt volledig op eigen verantwoordelijkheid.</p>
      <h2>Beschikbaarheid van de applicatie</h2>
      <p>De ontwikkelaars streven ernaar de applicatie zo goed mogelijk beschikbaar te houden, maar kunnen niet garanderen dat de applicatie altijd zonder onderbreking of fouten zal functioneren. De ontwikkelaars behouden zich het recht voor om de applicatie op elk moment te wijzigen, tijdelijk te onderbreken of stop te zetten.</p>
      <h2>Intellectuele eigendom</h2>
      <p>Alle inhoud van de applicatie, waaronder teksten, scenario’s, vormgeving, logo’s en andere materialen, is beschermd door intellectuele eigendomsrechten. Het is niet toegestaan om deze inhoud te kopiëren, verspreiden, aanpassen of gebruiken zonder voorafgaande toestemming van de ontwikkelaars.</p>
      <h2>Privacy en gegevensverwerking</h2>
      <p>Bij het gebruik van de applicatie kunnen bepaalde gegevens worden verzameld, zoals leeftijd of gender, voor analytische en onderzoeksdoeleinden. De verwerking van deze gegevens gebeurt volgens de geldende privacywetgeving. Meer informatie hierover is te vinden in het <a href="/privacybeleid">privacybeleid</a> van de applicatie.</p>
      <h2>Beperking van aansprakelijkheid</h2>
      <p>De ontwikkelaars zijn niet aansprakelijk voor:</p>
      <ul>
        <li>Directe of indirecte schade die voortvloeit uit het gebruik van de applicatie;</li>
        <li>Tijdelijke onbeschikbaarheid van de applicatie;</li>
        <li>Fouten of onvolledigheden in de inhoud.</li>
      </ul>
      <p>Het gebruik van de applicatie gebeurt op eigen risico van de gebruiker.</p>
      <h2>Wijzigingen van de voorwaarden</h2>
      <p>De ontwikkelaars behouden zich het recht voor om deze gebruikersvoorwaarden op elk moment te wijzigen. De meest recente versie zal steeds beschikbaar zijn in de applicatie. Door de applicatie verder te gebruiken na een wijziging, aanvaardt de gebruiker de aangepaste voorwaarden.</p>
      <h2>Contact</h2>
      <p>Bij vragen over deze gebruikersvoorwaarden kan contact worden opgenomen via de contactgegevens die in de applicatie vermeld staan.</p>
      <p class="text-muted">Laatste update: 2 juni 2026</p>
    </section>
  </main>
</template>

<style scoped>
.text-muted {
  color: var(--text-400);
  font-size: 0.875rem;
}
</style>