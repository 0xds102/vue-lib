<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'spinner',
    validator: (value: string) => ['spinner', 'dots', 'infinity', 'pulse'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'default',
    validator: (value: string) => [
      'default', 'primary', 'secondary', 'accent',
      'error', 'success', 'warning', 'info'
    ].includes(value)
  }
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  return sizes[props.size as keyof typeof sizes]
})

const colorClass = computed(() => {
  const colors = {
    default: 'text-base-content',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    error: 'text-error',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info'
  }
  return colors[props.color as keyof typeof colors] || 'text-base-content'
})
</script>

<template>
  <div class="inline-flex">
    <!-- Spinner variant -->
    <svg 
      v-if="variant === 'spinner'" 
      :class="[sizeClass, colorClass, 'animate-spin']" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <!-- Dots variant -->
    <div 
      v-else-if="variant === 'dots'" 
      :class="[sizeClass, colorClass, 'flex space-x-1 items-center justify-center']"
    >
      <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay: -0.3s;"></div>
      <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay: -0.15s;"></div>
      <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
    </div>

    <!-- Infinity variant -->
    <svg 
      v-else-if="variant === 'infinity'" 
      :class="[sizeClass, colorClass]" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        class="animate-dash"
        fill="none" 
        stroke="currentColor" 
        stroke-linecap="round" 
        stroke-width="2" 
        d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"
      />
    </svg>

    <!-- Pulse variant -->
    <div 
      v-else-if="variant === 'pulse'" 
      :class="[sizeClass, colorClass, 'relative']"
    >
      <span class="absolute inset-0 rounded-full bg-current opacity-75 animate-ping"></span>
      <span class="relative block rounded-full bg-current w-full h-full"></span>
    </div>
  </div>
</template>

<style scoped>
.animate-dash {
  stroke-dasharray: 30;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 60;
  }
}
</style>