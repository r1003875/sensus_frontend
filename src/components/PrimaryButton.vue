<script setup>
import BaseButton from '@/components/BaseButton.vue'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  text: {
    type: String,
    default: '',
  },
})

defineEmits(['click'])
</script>

<template>
  <BaseButton
    variant="primary"
    :text="text"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <template v-if="$slots['icon-left']" #icon-left>
      <slot name="icon-left" />
    </template>
    <template v-if="$slots['icon-right']" #icon-right>
      <slot name="icon-right" />
    </template>
  </BaseButton>
</template>
