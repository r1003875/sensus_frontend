<script setup>
defineProps({
  title: String,
  message: String,
})
</script>

<template>
  <section class="center-message">
    <h1>{{ title }}</h1>
    <p v-if="message">{{ message }}</p>
  </section>
</template>
