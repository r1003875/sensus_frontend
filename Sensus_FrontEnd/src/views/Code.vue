<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()
const code = ref(['', '', '', '', '', ''])

const handleInput = (index, event) => {
  const value = event.target.value
  if (value.length <= 1) {
    code.value[index] = value.toUpperCase()
    // Move to next input if value entered
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`)
      if (nextInput) nextInput.focus()
    }
  } else {
    event.target.value = code.value[index]
  }
}

const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    const prevInput = document.querySelector(`input[data-index="${index - 1}"]`)
    if (prevInput) prevInput.focus()
  } else if (event.key === 'ArrowLeft' && index > 0) {
    const prevInput = document.querySelector(`input[data-index="${index - 1}"]`)
    if (prevInput) prevInput.focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    const nextInput = document.querySelector(`input[data-index="${index + 1}"]`)
    if (nextInput) nextInput.focus()
  }
}

const startSession = () => {
  const fullCode = code.value.join('')
  if (fullCode.length === 6) {
    // TODO: Validate code and start session
    router.push('/gegevens')
  }
}
</script>

<template>
  <main class="app-screen">
    <TopNav backTo="/" />
    <section class="content-wrap">
      <h1>Voer de sessiecode in</h1>
      <p>Vraag je leerkracht of begeleider om de unieke sessiecode om verder te gaan.</p>
      <small class="required">Verplicht*</small>
      <label>Code*</label>
      <div class="code-input">
        <input
          v-for="(digit, index) in code"
          :key="index"
          v-model="code[index]"
          :data-index="index"
          type="text"
          inputmode="uppercase"
          maxlength="1"
          class="code-box"
          @input="handleInput(index, $event)"
          @keydown="handleKeyDown(index, $event)"
        />
      </div>
      <PrimaryButton text="Start" @click="startSession" />
    </section>
  </main>
</template>

<style scoped>
.code-input {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 24px 0;
}

.code-box {
  width: 48px;
  height: 48px;
  border: 1px solid #e8e5e3;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: text;
  transition: border-color 0.2s;
}

.code-box:focus {
  outline: none;
  border-color: var(--purple-600);
  box-shadow: 0 0 0 3px rgba(165, 10, 126, 0.1);
}

.code-box::placeholder {
  color: #e8e5e3;
}
</style>
