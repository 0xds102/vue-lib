<template>
    <div class="px-1"> <!-- Container with padding on sides -->
      <a
        :href="href"
        class="block px-3 py-2 text-sm text-base-content hover:bg-neutral/50 hover:text-base-content cursor-pointer rounded-md transition-colors"
        :class="{ 'bg-neutral/50 text-base-content': active }"
        @click="$emit('click', $event)"
      >
        <slot></slot>
      </a>
    </div>
  </template>
    
  <script setup lang="ts">
  interface Props {
    href?: string
    active?: boolean
  }
  
  withDefaults(defineProps<Props>(), {
    href: '#',
    active: false
  })
  
  defineEmits<{
    click: [event: MouseEvent]
  }>()
  </script>