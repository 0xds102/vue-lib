<template>
  <button 
    :class="[
      'inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      variantClasses,
      sizeClasses,
      className
    ]" 
    :disabled="disabled" 
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'error' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  type: 'button',
  className: ''
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-primary-content hover:bg-primary/90'
    case 'secondary':
      return 'bg-secondary text-secondary-content hover:bg-secondary/90'
    case 'accent':
      return 'bg-accent text-accent-content hover:bg-accent/90'
    case 'error':
      return 'bg-error text-error-content hover:bg-error/90'
    case 'outline':
      return 'border border-border bg-base-100 text-base-content hover:bg-neutral/50'
    case 'ghost':
      return 'text-base-content hover:bg-neutral/50'
    case 'link':
      return 'text-primary underline-offset-4 hover:underline'
    default:
      return 'bg-neutral border border-border text-neutral-content hover:bg-neutral/90'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 rounded-md px-3 text-xs'
    case 'lg':
      return 'h-10 rounded-md px-8'
    case 'icon':
      return 'h-9 w-9'
    default:
      return 'h-9 px-4 py-2'
  }
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>