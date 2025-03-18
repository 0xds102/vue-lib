<template>
    <textarea
      :class="[
        'flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white',
        'placeholder:text-slate-500',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      ]"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </template>
  
  <script setup lang="ts">
  interface Props {
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    rows?: number
    className?: string
  }
  
  withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
    disabled: false,
    rows: 4,
    className: ''
  })
  
  defineEmits<{
    'update:modelValue': [value: string]
  }>()
  </script>