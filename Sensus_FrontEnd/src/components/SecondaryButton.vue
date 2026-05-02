<script setup>
defineProps({
  text: String,
})

defineEmits(['click'])
</script>

<template>
  <button class="secondary-btn" @click="$emit('click')">{{ text }}</button>
</template>
