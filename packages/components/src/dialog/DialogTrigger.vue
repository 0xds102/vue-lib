<template>
  <div @click="dialogContext.open">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

interface DialogContext {
  isOpen: boolean
  open: () => void
  close: () => void
}

const dialogContext = inject('dialog') as DialogContext
</script>