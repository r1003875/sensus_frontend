<script setup>
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()

const goNext = () => router.push('/content-warning')
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="code" />
    <section class="content-wrap">
      <h1>Informatie over jou</h1>
      <p>We gebruiken deze gegevens alleen voor het analyseren van data. Zo krijgen wij een beter beeld over gedrag van jongeren op vlak van toestemming.</p>
      <small class="required">Verplicht*</small>
      <label>Leeftijd*</label>
      <select required>
        <option value="" disabled selected>Selecteer je leeftijd</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
      </select>
      <label>Gender*</label>
      <select required>
        <option value="" disabled selected>Selecteer je gender</option>
        <option value="man">Man</option>
        <option value="vrouw">Vrouw</option>
        <option value="non-binair">Non-binair</option>
        <option value="overige">Overige</option>
      </select>
      <p>Door verder te gaan ga je akkoord dat deze gegevens worden gebruikt voor het analyseren van data. Je deelname blijft volledig anoniem.</p>
      <PrimaryButton text="Ga verder" @click="goNext" />
    </section>
  </main>
</template>
