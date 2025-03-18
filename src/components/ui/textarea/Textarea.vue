<template>
  <textarea
    :class="[
      'flex w-full rounded-md border border-border bg-base-100 px-3 py-2 text-sm text-base-content ring-offset-base-100',
      'placeholder:text-neutral-content',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
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