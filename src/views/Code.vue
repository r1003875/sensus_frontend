<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthCode } from '@/composables/useAuthCode'

const router = useRouter()
const { validateAuthCode } = useAuthCode()
const code = ref(['', '', '', '', '', ''])
const errorMessage = ref('')
const isSubmitting = ref(false)

const focusInput = (index) => {
  const nextInput = document.querySelector(`input[data-index="${index}"]`)
  if (nextInput) {
    nextInput.focus()
  }
}

const normalizeDigit = (value) => String(value ?? '').replace(/\D/g, '').slice(0, 1)

const handleInput = (index, event) => {
  const digit = normalizeDigit(event.target.value)
  code.value[index] = digit
  errorMessage.value = ''

  if (digit && index < 5) {
    focusInput(index + 1)
  }

  event.target.value = digit
}

const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    focusInput(index - 1)
  } else if (event.key === 'ArrowLeft' && index > 0) {
    focusInput(index - 1)
  } else if (event.key === 'ArrowRight' && index < 5) {
    focusInput(index + 1)
  }
}

const startSession = async () => {
  if (isSubmitting.value) {
    return
  }

  const fullCode = code.value.join('')

  if (!/^\d{6}$/.test(fullCode)) {
    errorMessage.value = 'Voer een geldige 6-cijferige code in.'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const result = await validateAuthCode(fullCode)

    if (!result.valid) {
      errorMessage.value = result.message
      return
    }

    await router.push('/gegevens')
  } catch (error) {
    console.error('Kon de toegangscode niet valideren.', error)
    errorMessage.value = 'Kon de code niet controleren. Probeer het opnieuw.'
  } finally {
    isSubmitting.value = false
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
      <label>Code<span class="required">*</span></label>
      <div class="code-input">
        <input
          v-for="(digit, index) in code"
          :key="index"
          :value="digit"
          :data-index="index"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          class="code-box"
          :class="{ 'code-box--error': errorMessage }"
          @input="handleInput(index, $event)"
          @keydown="handleKeyDown(index, $event)"
        />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <PrimaryButton :text="isSubmitting ? 'Controleren...' : 'Start'" @click="startSession" />
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

.code-box--error {
  border-color: var(--error-600);
}

.error-message {
  color: var(--error-600);
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
}
</style>
