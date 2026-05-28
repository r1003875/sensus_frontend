<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'

defineProps({
  title: String,
  description: String,
  tag: String,
})

defineEmits(['start'])
</script>

<template>
  <article class="scenario-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <small>{{ tag }}</small>
    <PrimaryButton text="Start" @click="$emit('start')" />
  </article>
</template>
