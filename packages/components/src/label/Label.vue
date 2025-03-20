<template>
    <label
      :for="htmlFor"
      :class="[
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        'text-base-content',
        className
      ]"
    >
      <slot></slot>
    </label>
  </template>
  
  <script setup lang="ts">
  interface Props {
    htmlFor?: string
    className?: string
  }
  
  withDefaults(defineProps<Props>(), {
    htmlFor: undefined,
    className: ''
  })
  </script>