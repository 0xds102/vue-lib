<template>
    <div class="flex items-center space-x-3">
      <label :for="id" class="relative flex items-center justify-center cursor-pointer">
        <input
          type="radio"
          :id="id"
          :name="name || groupId"
          :value="value"
          :disabled="disabled"
          class="absolute opacity-0 w-0 h-0 sr-only"
          @change="onChange"
        />
        <span class="h-5 w-5 rounded-full border flex items-center justify-center"
              :class="[
                isChecked ? 'border-2 border-primary' : 'border-border',
                disabled ? 'opacity-50' : '',
                'bg-base-100'
              ]">
          <span class="h-2.5 w-2.5 rounded-full bg-primary" 
                :class="isChecked ? 'opacity-100' : 'opacity-0'"></span>
        </span>
      </label>
      <label :for="id" class="text-sm font-medium text-base-content cursor-pointer" 
             :class="disabled ? 'cursor-not-allowed opacity-70' : ''">
        <!-- Use label prop if provided, otherwise use slot content -->
        <template v-if="label">{{ label }}</template>
        <slot v-else></slot>
      </label>
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject, ref, computed } from 'vue'
  
  interface Props {
    id: string
    name?: string
    value: string
    label?: string
    disabled?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    name: '',
    label: '',
    disabled: false
  })
  
  // Get the RadioGroup context
  const groupId = inject('radioGroupId', '')
  const selectedValue = inject('radioGroupSelected', ref(''))
  
  // Compute if this radio is checked
  const isChecked = computed(() => selectedValue.value === props.value)
  
  function onChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.checked) {
      selectedValue.value = props.value
    }
  }
  </script>