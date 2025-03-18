<template>
  <button :class="buttonVariants({ variant, size, class: className })" :disabled="disabled" :type="type"
    @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { buttonVariants } from '.'

interface Props {
  variant?: 'default' | 'primary' | 'error' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  type: 'button',
  className: ''
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>