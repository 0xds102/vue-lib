<script setup lang="ts">
import { addMonths, format } from 'date-fns'

const props = defineProps<{
  modelValue: Date
}>()

const emit = defineEmits<{
  'update:modelValue': [date: Date]
}>()

const navigateMonth = (direction: number) => {
  emit('update:modelValue', addMonths(props.modelValue, direction))
}
</script>

<template>
  <div class="flex items-center justify-between">
    <button
      type="button"
      class="p-2 hover:bg-neutral rounded-md text-base-content"
      @click="navigateMonth(-1)"
    >
      <span class="sr-only">Previous month</span>
      ←
    </button>
    
    <h2 class="font-semibold text-base-content">
      {{ format(modelValue, 'MMMM yyyy') }}
    </h2>
    
    <button
      type="button"
      class="p-2 hover:bg-neutral rounded-md text-base-content"
      @click="navigateMonth(1)"
    >
      <span class="sr-only">Next month</span>
      →
    </button>
  </div>
</template>