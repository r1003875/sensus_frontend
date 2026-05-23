<script setup>
import { useRouter } from 'vue-router'

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
    <button class="link-btn back-btn" @click="goBack"><img src="../assets/icons/fi-rr-arrow-small-left.svg" alt="Terug" />Terug</button>
    <button class="icon-btn" @click="goFaq"><img src="../assets/icons/fi-rr-interrogation.svg" alt="FAQ" /></button>
  </header>
</template>
