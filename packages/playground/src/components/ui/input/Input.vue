<template>
  <input
    :class="[
      'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-fg',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    ]"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
  
  <script setup lang="ts">
  interface Props {
    modelValue?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    className?: string
  }
  
  withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    className: ''
  })
  
  defineEmits<{
    'update:modelValue': [value: string]
  }>()
  </script>