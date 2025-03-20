<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Calendar } from '../calendar'
import { Input } from '../input'
import { format } from 'date-fns'
import { PhCalendarBlank } from '@phosphor-icons/vue'

const props = withDefaults(defineProps<{
    modelValue?: Date
    placeholder?: string
    disabled?: boolean
    className?: string
}>(), {
    placeholder: 'Pick a date',
    disabled: false,
    className: ''
})

const emit = defineEmits<{
    'update:modelValue': [date: Date | undefined]
}>()

const isOpen = ref(false)
const inputRef = ref<HTMLInputElement>()

const formattedDate = computed(() => {
    return props.modelValue ? format(props.modelValue, 'PP') : ''
})

const onDateSelect = (date: Date) => {
    emit('update:modelValue', date)
    isOpen.value = false
}

const onClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.datepicker-container')) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
})
</script>

<template>
    <div class="relative datepicker-container w-[280px]" :class="className">
        <div class="relative">
            <Input ref="inputRef" :model-value="formattedDate" readonly :placeholder="placeholder" :disabled="disabled"
                class="w-full pl-10 cursor-pointer hover:bg-slate-50" @click="isOpen = !isOpen" />
            <PhCalendarBlank class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" :size="16" />
        </div>

        <div v-if="isOpen" class="absolute left-0 z-50 mt-2 w-[280px]" v-click-outside="onClickOutside">
            <Calendar :model-value="modelValue" :disabled="disabled" @update:modelValue="onDateSelect" />
        </div>
    </div>
</template>