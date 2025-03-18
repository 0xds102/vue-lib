<template>
    <a
      :href="href"
      class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
      :class="{ 'bg-slate-100 text-slate-900': active }"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </a>
  </template>
  
  <script setup lang="ts">
  interface Props {
    href?: string
    active?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    href: '#',
    active: false
  })
  
  defineEmits<{
    click: [event: MouseEvent]
  }>()
  </script>