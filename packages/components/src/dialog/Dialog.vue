<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

interface DialogContext {
  isOpen: boolean
  open: () => void
  close: () => void
}

const isOpen = ref(false)

const dialogContext: DialogContext = {
  get isOpen() { return isOpen.value },
  open: () => isOpen.value = true,
  close: () => isOpen.value = false
}

provide('dialog', dialogContext)
</script>