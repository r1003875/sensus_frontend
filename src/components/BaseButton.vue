<script setup>
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'link', 'icon'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  iconLeft: {
    type: String,
    default: '',
  },
  iconRight: {
    type: String,
    default: '',
  },
  iconLeftAlt: {
    type: String,
    default: '',
  },
  iconRightAlt: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const variantClass = computed(() => {
  if (props.variant === 'secondary') {
    return 'secondary-btn'
  }

  if (props.variant === 'link') {
    return 'link-btn'
  }

  if (props.variant === 'icon') {
    return 'icon-btn'
  }

  return 'primary-btn'
})

const sizeClass = computed(() => {
  if (props.size === 'sm') {
    return 'app-btn--size-sm'
  }

  if (props.size === 'lg') {
    return 'app-btn--size-lg'
  }

  return 'app-btn--size-md'
})
const isDisabled = computed(() => props.disabled || props.loading)
const resolvedLabel = computed(() => {
  if (props.loading && props.loadingText) {
    return props.loadingText
  }

  return props.text
})

const handleClick = (event) => {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="[
      variantClass,
      'app-btn',
      sizeClass,
      {
        'app-btn--inline': !fullWidth,
      },
    ]"
    :disabled="isDisabled"
    :aria-busy="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <span v-if="$slots['icon-left'] || iconLeft" class="app-btn__icon app-btn__icon--left" aria-hidden="true">
      <slot name="icon-left">
        <img :src="iconLeft" :alt="iconLeftAlt" />
      </slot>
    </span>

    <span class="app-btn__label">
      <slot>{{ resolvedLabel }}</slot>
    </span>

    <span v-if="$slots['icon-right'] || iconRight" class="app-btn__icon app-btn__icon--right" aria-hidden="true">
      <slot name="icon-right">
        <img :src="iconRight" :alt="iconRightAlt" />
      </slot>
    </span>
  </button>
</template>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.app-btn--inline {
  width: auto;
}

.app-btn.app-btn--size-sm {
  min-height: 40px;
  padding: 10px 16px;
  font-size: 14px;
}

.app-btn.app-btn--size-lg {
  min-height: 56px;
  padding: 14px 28px;
  font-size: 17px;
}

.app-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.app-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.app-btn__icon img {
  width: 18px;
  height: 18px;
}
</style>