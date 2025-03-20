// components/ui/calendar/types.ts
export type DayObject = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  disabled?: boolean
}