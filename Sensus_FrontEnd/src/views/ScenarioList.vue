<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import ScenarioCard from '@/components/ScenarioCard.vue'

const router = useRouter()

const scenarios = [
  { title: 'Online gesprek loopt vast', desc: 'Je stuurt je crush berichten. Het gesprek komt maar moeilijk op gang.', tag: 'Online gedrag' },
  { title: 'Dronken klasgenoot', desc: 'Je komt een klasgenoot tegen op een feestje. Je klasgenoot is duidelijk onder invloed.', tag: 'Alcohol' },
  { title: 'Badkamer', desc: 'Je jongere broertje komt de badkamer binnen als je aan het douchen bent.', tag: 'Familie' },
  { title: 'Vriendin helpen', desc: 'Een vriendin vertelt over haar situationship. Je hoort dingen waar je je vragen bij stelt.', tag: 'Omstaander' },
]

const startScenario = (scenario) => {
  router.push('/intro-scenario')
}
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/content-warning" />
    <section class="content-wrap content-wrap--wide">
      <h1>Scenario's</h1>
      <p>Kies een situatie die je wil verkennen</p>
      <div class="scenario-grid">
        <ScenarioCard
          v-for="s in scenarios"
          :key="s.title"
          :title="s.title"
          :description="s.desc"
          :tag="s.tag"
          @start="startScenario(s)"
        />
      </div>
    </section>
  </main>
</template>
