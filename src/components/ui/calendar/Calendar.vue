<script setup lang="ts">
import { ref, computed } from 'vue'
import { addDays, startOfMonth, startOfWeek, isSameDay } from 'date-fns'
import CalendarCell from './CalendarCell.vue'
import CalendarHeader from './CalendarHeader.vue'
import type { DayObject } from './types'

const props = withDefaults(defineProps<{
  modelValue?: Date
  disabled?: boolean
}>(), {
  modelValue: undefined,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [date: Date]
}>()

const currentMonth = ref(props.modelValue || new Date())

const weeks = computed(() => {
  const days: DayObject[][] = []
  const firstDayOfMonth = startOfMonth(currentMonth.value)
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth)
  
  let currentDay = firstDayOfCalendar
  
  for (let week = 0; week < 6; week++) {
    const weekDays: DayObject[] = []
    
    for (let day = 0; day < 7; day++) {
      weekDays.push({
        date: currentDay,
        isCurrentMonth: currentDay.getMonth() === currentMonth.value.getMonth(),
        isToday: isSameDay(currentDay, new Date()),
        isSelected: props.modelValue ? isSameDay(currentDay, props.modelValue) : false,
        disabled: props.disabled
      })
      currentDay = addDays(currentDay, 1)
    }
    
    days.push(weekDays)
  }
  
  return days
})
</script>

<template>
  <div class="inline-block p-3 bg-white rounded-lg shadow">
    <CalendarHeader
      v-model="currentMonth"
    />
    <div class="grid grid-cols-7 gap-1 mt-2">
      <span 
        v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" 
        :key="day"
        class="text-sm font-medium text-center text-gray-500"
      >
        {{ day }}
      </span>
      
      <template v-for="week in weeks" :key="week[0].date.toISOString()">
        <CalendarCell
          v-for="day in week"
          :key="day.date.toISOString()"
          :day="day"
          @select="emit('update:modelValue', day.date)"
        />
      </template>
    </div>
  </div>
</template>