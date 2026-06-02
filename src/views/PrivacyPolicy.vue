<script setup>
import TopNav from '@/components/TopNav.vue'
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/faq" />
    <section class="content-wrap" :class="{ 'content-wrap--long': true }">
      <h1>Privacybeleid</h1>
      <p>Dit privacybeleid beschrijft hoe Sensus persoonsgegevens verzamelt, gebruikt en beschermt.
Wij hechten veel belang aan de bescherming van de privacy van onze gebruikers en verwerken persoonsgegevens in overeenstemming met de geldende privacywetgeving, waaronder de Algemene Verordening Gegevensbescherming (AVG/GDPR).
Door gebruik te maken van de applicatie gaat de gebruiker akkoord met de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.</p>
      <h2>Welke gegevens verzamelen wij?</h2>
      <p>Bij het gebruik van de applicatie kunnen de volgende gegevens worden verzameld:</p>
      <ul>
        <li>Persoonlijke gegevens die de gebruiker zelf invult, zoals leeftijd en gender. Deze gegevens worden uitsluitend verzameld voor analytische en onderzoeksdoeleinden. </li>
        <li>Gebruiksgegevens.</li>
        <li>Anonieme gegevens over het gebruik van de applicatie, zoals: welke scenario’s worden gestart, interacties binnen scenario’s, en algemene gebruiksstatistieken.</li>
      </ul>
      <p>Deze gegevens helpen ons om de applicatie te verbeteren.</p>
      <h2>Doeleinden van de gegevensverwerking</h2>
      <p>De verzamelde gegevens worden gebruikt voor de volgende doeleinden:</p>
      <ul>
        <li>Het analyseren van het gebruik van de applicatie.</li>
        <li>Het verbeteren van de inhoud en functionaliteit.</li>
        <li>Onderzoeksdoeleinden in het kader van het project.</li>
      </ul>
      <p>De gegevens worden niet gebruikt voor commerciële doeleinden.</p>
      <h2>Rechtsgrond voor verwerking</h2>
      <p>De verwerking van persoonsgegevens gebeurt op basis van de volgende rechtsgronden:</p>
      <ul>
        <li>Toestemming van de gebruiker.</li>
        <li>Het gerechtvaardigd belang om de applicatie te analyseren en te verbeteren.</li>
      </ul>
      <p>Gebruikers kunnen hun toestemming op elk moment intrekken.</p>
      <h2>Delen van gegevens</h2>
      <p>De verzamelde gegevens worden niet verkocht of gedeeld met commerciële derden. In sommige gevallen kunnen gegevens worden verwerkt door technische dienstverleners die helpen bij het hosten of beheren van de applicatie (bijvoorbeeld hostingproviders). Deze partijen verwerken gegevens enkel in opdracht van de ontwikkelaars.</p>
      <h2>Bewaartermijn</h2>
      <p>Persoonsgegevens worden niet langer bewaard dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld. Gegevens kunnen worden bewaard zolang het project actief is of zolang ze nodig zijn voor analyse en evaluatie.</p>
      <h2>Beveiliging van gegevens</h2>
      <p>Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen:</p>
      <ul>
        <li>Ongeautoriseerde toegang</li>
        <li>Verlies of misbruik</li>
        <li>Onrechtmatige verwerking</li>
      </ul>
      <p>Ondanks deze maatregelen kan absolute veiligheid nooit volledig worden gegarandeerd.</p>
      <h2>Rechten van gebruikers</h2>
      <p>Omdat het gebruiken van deze tool volledig anoniem gebeurt heeft een gebruiker niet de mogelijkheid om diens gegevens in te kijken noch aan te passen of verwijderen.</p>
      <h2>Minderjarigen</h2>
      <p>De applicatie is bedoeld voor jongeren. Indien persoonsgegevens van minderjarigen worden verwerkt, gebeurt dit uitsluitend in het kader van het educatieve doel van de applicatie en met respect voor de geldende privacyregels.</p>
      <h2>Wijzigingen in het privacybeleid</h2>
      <p>Dit privacybeleid kan van tijd tot tijd worden aangepast. De meest recente versie zal steeds beschikbaar zijn in de applicatie.</p>
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