<template>
    <div class="space-y-2">
      <!-- Use label prop if provided, otherwise use slot content -->
      <Label v-if="label">{{ label }}</Label>
      <slot v-else name="label"></slot>
      
      <div :class="['flex', inline ? 'flex-row gap-x-6' : 'flex-col gap-y-2', className]">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { provide, ref } from 'vue'
  import { Label } from '../label'
  
  interface Props {
    inline?: boolean
    className?: string
    label?: string
  }
  
  withDefaults(defineProps<Props>(), {
    inline: false,
    className: '',
    label: ''
  })
  
  // Create a unique group ID for this RadioGroup
  const groupId = 'radio-group-' + Math.random().toString(36).substring(2, 9)
  provide('radioGroupId', groupId)
  
  // Track selected value internally
  const selectedValue = ref('')
  provide('radioGroupSelected', selectedValue)
  </script>