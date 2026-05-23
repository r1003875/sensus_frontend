<script setup>
defineProps({
  text: String,
})

defineEmits(['click'])
</script>

<template>
  <button class="primary-btn" @click="$emit('click')">{{ text }}</button>
</template>
