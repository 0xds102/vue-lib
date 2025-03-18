<template>
  <a
    :href="href"
    class="block px-4 py-2 text-sm text-base-content hover:bg-neutral/50 hover:text-base-content cursor-pointer"
    :class="{ 'bg-neutral/50 text-base-content': active }"
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