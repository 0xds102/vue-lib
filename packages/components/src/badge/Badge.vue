<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'outline' | 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'info' | 'warning'
  className?: string
}>(), {
  variant: 'default',
  className: ''
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-md px-2 py-1 text-xs font-normal ring-1 ring-inset',
      variant === 'default' && 'bg-neutral/10 text-neutral-content ring-neutral/20',
      variant === 'outline' && 'bg-base-100 text-base-content ring-border',
      variant === 'primary' && 'bg-primary/10 text-primary ring-primary/20',
      variant === 'secondary' && 'bg-secondary/10 text-secondary ring-secondary/20',
      variant === 'accent' && 'bg-accent/10 text-accent ring-accent/20',
      variant === 'error' && 'bg-error/10 text-error ring-error/20',
      variant === 'success' && 'bg-success/10 text-success ring-success/20',
      variant === 'info' && 'bg-info/10 text-info ring-info/20',
      variant === 'warning' && 'bg-warning/10 text-warning ring-warning/20',
      className
    ]"
  >
    <slot />
  </span>
</template>