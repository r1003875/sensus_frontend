<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  backTo: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const goBack = () => router.push(props.backTo)
const goFaq = () => router.push({ path: '/faq', query: { backTo: props.backTo } })
</script>

<template>
  <header class="top-nav">
    <BaseButton variant="link" class="back-btn" :full-width="false" @click="goBack">
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
