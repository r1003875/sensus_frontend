<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const route = useRoute()
const router = useRouter()

const scenarios = [
  { title: 'Online gesprek loopt vast', desc: 'Je stuurt je crush berichten. Het gesprek komt maar moeilijk op gang.', tag: 'Online gedrag' },
  { title: 'Dronken klasgenoot', desc: 'Je komt een klasgenoot tegen op een feestje. Je klasgenoot is duidelijk onder invloed.', tag: 'Alcohol' },
  { title: 'Badkamer', desc: 'Je jongere broertje komt de badkamer binnen als je aan het douchen bent.', tag: 'Familie' },
  { title: 'Vriendin helpen', desc: 'Een vriendin vertelt over haar situationship. Je hoort dingen waar je je vragen bij stelt.', tag: 'Omstaander' },
]

const screen = computed(() => route.name)
const isTextHeavy = computed(() => ['gebruikersvoorwaarden', 'privacybeleid'].includes(String(route.name)))
const isCenterMessage = computed(() => ['loading', 'offline', '404', '405'].includes(String(route.name)))

const go = (path) => router.push(path)
</script>

<template>
  <main class="app-screen" :class="{ 'app-screen--center': isCenterMessage }">
    <header v-if="screen !== 'start'" class="top-nav">
      <BaseButton variant="link" :full-width="false" @click="go('/')">Terug</BaseButton>
      <BaseButton variant="icon" :full-width="false" aria-label="FAQ" @click="go('/faq')">?</BaseButton>
    </header>

    <section v-if="screen === 'start'" class="start-screen">
      <div class="start-screen__logo">
        <img src="https://www.figma.com/api/mcp/asset/ee3f27a5-cf39-42e6-8128-e30f001a4941" alt="" />
      </div>
      <h1>Oefen met grenzen en consent</h1>
      <p>Ontdek realistische situaties en leer hoe jij op een veilige, respectvolle manier kan reageren.</p>
      <PrimaryButton text="Start" @click="go('/gegevens')" />
    </section>

    <section v-else-if="screen === 'gegevens'" class="content-wrap">
      <h1>Informatie over jou</h1>
      <p>We gebruiken deze gegevens alleen voor het analyseren van data. Zo krijgen wij een beter beeld over gedrag van jongeren op vlak van toestemming.</p>
      <small class="required">Verplicht*</small>
      <label>Leeftijd*</label>
      <select><option>Selecteer je leeftijd</option></select>
      <label>Gender*</label>
      <select><option>Selecteer je gender</option></select>
      <p>Door verder te gaan ga je akkoord dat deze gegevens worden gebruikt voor het analyseren van data. Je deelname blijft volledig anoniem.</p>
      <PrimaryButton text="Ga verder" @click="go('/content-warning')" />
    </section>

    <section v-else-if="screen === 'content-warning'" class="content-wrap">
      <h1>Voor je begint</h1>
      <p>Deze tool toont situaties die gaan over grenzen, communicatie en online gedrag. Sommige momenten kunnen gevoelig aanvoelen. Je kunt altijd stoppen.</p>
      <PrimaryButton text="Ik begrijp het" @click="go('/scenario-lijst')" />
    </section>

    <section v-else-if="screen === 'scenario-lijst'" class="content-wrap content-wrap--wide">
      <h1>Scenario&apos;s</h1>
      <p>Kies een situatie die je wil verkennen</p>
      <div class="scenario-grid">
        <article v-for="s in scenarios" :key="s.title" class="scenario-card">
          <h2>{{ s.title }}</h2>
          <p>{{ s.desc }}</p>
          <small>{{ s.tag }}</small>
          <PrimaryButton text="Start" @click="go('/intro-scenario')" />
        </article>
      </div>
    </section>

    <section v-else-if="screen === 'intro-scenario'" class="content-wrap">
      <h1>Online gesprek loopt vast</h1>
      <p>Je stuurt je crush berichten. Het gesprek komt maar moeilijk op gang.</p>
      <PrimaryButton text="Start" @click="go('/safe-exit')" />
      <small>Dit scenario duurt ongeveer 2-3 minuten.</small>
      <SecondaryButton text="Pauzeer scenario" @click="go('/safe-exit')" />
    </section>

    <section v-else-if="screen === 'safe-exit'" class="content-wrap">
      <h1>Even pauze?</h1>
      <p>Je hoeft niet verder te gaan als het niet goed voelt. Neem een moment voor jezelf. Je kan altijd later opnieuw starten.</p>
      <small>Er wordt niets opgeslagen.</small>
      <PrimaryButton text="Ga verder" @click="go('/einde')" />
      <SecondaryButton text="Stop" @click="go('/loading')" />
    </section>

    <section v-else-if="screen === 'einde'" class="content-wrap">
      <h1>Je hebt het scenario afgerond!</h1>
      <p>Goed gedaan! Je hebt scenario 1 succesvol afgerond. Bedankt voor je deelname.</p>
      <p>Heb je nog vragen? Aarzel niet om de moderator aan te spreken.</p>
      <ul>
        <li>Respecteer een "nee", ook online</li>
        <li>Let op signalen in het gesprek</li>
        <li>Je hoeft niemand te overtuigen</li>
        <li>Geef iemand de nodige ruimte</li>
        <li>Denk na over hoe jouw berichten kunnen overkomen</li>
        <li>Blijf respectvol, ook als je teleurgesteld bent</li>
        <li>Grenzen werken in twee richtingen</li>
      </ul>
      <SecondaryButton text="Afronden" @click="go('/scenario-lijst')" />
    </section>

    <section v-else-if="screen === 'faq'" class="content-wrap">
      <h1>FAQ</h1>
      <h2>Hoe werkt deze tool?</h2>
      <p>Om meer te leren over grenzen en consent kun je in deze applicatie scenario&apos;s starten. Er zijn verschillende scenario&apos;s over verschillende onderwerpen.</p>
      <h2>Waarom moet ik mijn leeftijd en gender invullen?</h2>
      <p>We gebruiken deze informatie uitsluitend voor analytische doeleinden. Zo krijgen we een beter beeld van het gedrag van jongeren met betrekking tot consent.</p>
      <h2>Contact</h2>
      <p>Neem contact met ons op via sensus-app@outlook.com</p>
      <p><a href="" @click.prevent="go('/privacybeleid')">privacybeleid</a> - <a href="" @click.prevent="go('/gebruikersvoorwaarden')">gebruikersvoorwaarden</a></p>
    </section>

    <section v-else-if="screen === 'gebruikersvoorwaarden'" class="content-wrap" :class="{ 'content-wrap--long': isTextHeavy }">
      <h1>Gebruikersvoorwaarden</h1>
      <p>Deze gebruikersvoorwaarden zijn van toepassing op het gebruik van de applicatie Sensus. Door de applicatie te gebruiken gaat de gebruiker akkoord met deze voorwaarden.</p>
      <h2>Gebruik van de applicatie</h2>
      <p>De gebruiker verbindt zich ertoe de applicatie wettig en respectvol te gebruiken.</p>
      <h2>Inhoud van de applicatie</h2>
      <p>De inhoud is bedoeld voor educatieve en informatieve doeleinden en vervangt geen professioneel advies.</p>
      <h2>Contact</h2>
      <p>Bij vragen kan contact worden opgenomen via de contactgegevens in de applicatie.</p>
    </section>

    <section v-else-if="screen === 'privacybeleid'" class="content-wrap" :class="{ 'content-wrap--long': isTextHeavy }">
      <h1>Privacybeleid</h1>
      <p>Dit privacybeleid beschrijft hoe Sensus persoonsgegevens verzamelt, gebruikt en beschermt.</p>
      <h2>Welke gegevens verzamelen wij?</h2>
      <p>Leeftijd en gender worden uitsluitend verzameld voor analytische en onderzoeksdoeleinden.</p>
      <h2>Beveiliging van gegevens</h2>
      <p>Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen.</p>
      <h2>Rechten van gebruikers</h2>
      <p>Omdat het gebruik van deze tool anoniem gebeurt, kunnen gegevens niet individueel worden opgevraagd of verwijderd.</p>
    </section>

    <section v-else-if="screen === 'loading'" class="center-message">
      <h1>Even geduld...</h1>
    </section>

    <section v-else-if="screen === 'offline'" class="center-message">
      <h1>Oeps! Controleer je verbinding!</h1>
      <p>Probeer het later opnieuw.</p>
    </section>

    <section v-else class="center-message">
      <h1>Oeps! De server zegt nee, en dat is oké!</h1>
      <p>Probeer het later opnieuw.</p>
    </section>
  </main>
</template>
