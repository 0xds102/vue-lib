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
      day.isCurrentMonth ? 'text-slate-900' : 'text-slate-400',
      day.isSelected && 'bg-black text-white hover:bg-gray-900',
      !day.isSelected && 'hover:bg-slate-100',
      day.isToday && !day.isSelected && 'border border-gray-200 text-purple-500'
    ]"
    @click="emit('select', day.date)"
  >
    {{ day.date.getDate() }}
  </button>
</template>