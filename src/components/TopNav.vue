<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  backTo: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  faqBackTo: {
    type: String,
    default: '',
  },
})

const router = useRouter()

const goBack = () => {
  if (!props.backTo) {
    return
  }

  router.push(props.backTo)
}

const goFaq = () => {
  const backTo = props.faqBackTo || props.backTo

  router.push(backTo ? { path: '/faq', query: { backTo } } : '/faq')
}
</script>

<template>
  <header class="top-nav" :class="{ 'top-nav--no-back': !(showBack && backTo) }">
    <BaseButton
      v-if="showBack && backTo"
      variant="link"
      class="back-btn"
      :full-width="false"
      @click="goBack"
    >
      <template #icon-left>
        <img src="../assets/icons/fi-rr-arrow-small-left.svg" alt="" aria-hidden="true" />
      </template>
      Terug
    </BaseButton>

    <BaseButton
      variant="icon"
      :full-width="false"
      aria-label="FAQ"
      @click="goFaq"
    >
      <img src="../assets/icons/fi-rr-interrogation.svg" alt="" aria-hidden="true" />
    </BaseButton>
  </header>
</template>
