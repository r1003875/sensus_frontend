<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()

const age = ref('')
const gender = ref('')
const ageError = ref(false)
const genderError = ref(false)

const goNext = () => {
  ageError.value = !age.value
  genderError.value = !gender.value

  if (!ageError.value && !genderError.value) {
    router.push('/content-warning')
  }
}
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="code" />
    <section class="content-wrap">
      <h1>Informatie over jou</h1>
      <p>We gebruiken deze gegevens alleen voor het analyseren van data. Zo krijgen wij een beter beeld over gedrag van jongeren op vlak van toestemming.</p>
      <small class="required">Verplicht*</small>
      <label>Leeftijd<span class="required">*</span></label>
      <select v-model="age" required :class="{ 'select--error': ageError }">
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
      <div v-if="ageError" class="error-message">Selecteer je leeftijd</div>
      <label>Gender<span class="required">*</span></label>
      <select v-model="gender" required :class="{ 'select--error': genderError }">
        <option value="" disabled selected>Selecteer je gender</option>
        <option value="male">Man</option>
        <option value="female">Vrouw</option>
        <option value="non-binary">Non-binair</option>
        <option value="other">Overige</option>
      </select>
      <div v-if="genderError" class="error-message">Selecteer je gender</div>
      <p>Door verder te gaan ga je akkoord dat deze gegevens worden gebruikt voor het analyseren van data. Je deelname blijft volledig anoniem.</p>
      <PrimaryButton text="Ga verder" @click="goNext" />
    </section>
  </main>
</template>

<style scoped>
select {
  transition: border-color 0.2s;
}

.select--error {
  border-color: var(--error-600);
}

.error-message {
  color: var(--error-600);
  font-size: 14px;
  margin-top: 8px;
}
</style>
