<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => router.push('/')
const goFaq = () => router.push('/faq')
</script>

<template>
  <header class="top-nav">
    <button class="link-btn" @click="goBack">Terug</button>
    <button class="icon-btn" @click="goFaq">?</button>
  </header>
</template>
