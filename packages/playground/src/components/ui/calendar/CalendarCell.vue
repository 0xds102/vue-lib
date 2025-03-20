<script setup lang="ts">
import type { DayObject } from './types'

defineProps<{
  day: DayObject
}>()

const emit = defineEmits<{
  select: [date: Date]
}>()
</script>

<template>
  <button
    type="button"
    :disabled="day.disabled"
    :class="[
      'h-9 w-9 rounded-md text-sm p-0 font-normal aria-selected:opacity-100',
      day.isCurrentMonth ? 'text-base-content' : 'text-neutral-content/60',
      day.isSelected && 'bg-primary text-primary-content hover:bg-primary/90',
      !day.isSelected && 'hover:bg-neutral',
      day.isToday && !day.isSelected && 'border border-border text-accent'
    ]"
    @click="emit('select', day.date)"
  >
    {{ day.date.getDate() }}
  </button>
</template>