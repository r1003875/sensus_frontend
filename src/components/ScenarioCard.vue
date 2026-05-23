<script setup>
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
    <button class="primary-btn" @click="$emit('start')">Start</button>
  </article>
</template>
