<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'default' | 'outline' | 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'warning'
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
        variant === 'default' && 'bg-default text-default-foreground ring-default-foreground/10',
        variant === 'outline' && 'bg-background text-foreground ring-border',
        variant === 'primary' && 'bg-primary/10 text-primary ring-primary/20',
        variant === 'secondary' && 'bg-secondary/10 text-secondary ring-secondary/20',
        variant === 'danger' && 'bg-danger/10 text-danger ring-danger/20',
        variant === 'success' && 'bg-success/10 text-success ring-success/20',
        variant === 'info' && 'bg-info/10 text-info ring-info/20',
        variant === 'warning' && 'bg-warning/10 text-warning ring-warning/20',
        className
      ]"
    >
      <slot />
    </span>
</template>