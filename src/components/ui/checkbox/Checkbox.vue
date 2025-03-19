<template>
    <div class="flex items-start gap-2">
      <div class="flex items-center justify-center h-full pt-[2px]">
        <label :for="id" class="relative flex items-center justify-center cursor-pointer"
               :class="{ 'cursor-not-allowed opacity-50': disabled }">
          <input 
            :id="id"
            type="checkbox"
            :checked="isChecked"
            :disabled="disabled"
            :required="required"
            class="absolute opacity-0 w-0 h-0 sr-only"
            @change="onChange"
          />
          
          <span 
            :class="[
              sizeClasses,
              'border-2 rounded-md flex items-center justify-center transition-colors',
              'focus-visible:ring-2 focus-visible:ring-offset-2',
              colorClasses.ring,
              isChecked 
                ? [colorClasses.bg, colorClasses.border, 'text-primary-foreground'] 
                : 'border-border bg-transparent text-transparent hover:border-gray-400',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            ]"
          >
            <!-- Checkmark Icon -->
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              :stroke-width="3"
              stroke-linecap="round" 
              stroke-linejoin="round"
              class="w-full h-full p-0.5"
              :class="isChecked ? 'opacity-100 text-base-100' : 'opacity-0'"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            
            <!-- Indeterminate Icon -->
            <div 
              v-if="indeterminate" 
              class="absolute inset-0 flex items-center justify-center"
            >
              <div 
                class="w-[60%] h-[2px] bg-current"
                :class="isChecked ? 'bg-white' : 'bg-gray-600'"
              ></div>
            </div>
          </span>
        </label>
      </div>
      
      <div v-if="label || $slots.default" class="grid gap-1">
        <label 
          :for="id" 
          class="cursor-pointer select-none text-base-content"
          :class="[
            labelSizeClasses,
            disabled ? 'cursor-not-allowed opacity-70' : '',
            required ? 'after:content-[\'*\'] after:text-error after:ml-0.5' : ''
          ]"
        >
          <template v-if="label">{{ label }}</template>
          <slot v-else></slot>
        </label>
        
        <p 
          v-if="description || $slots.description" 
          class="text-sm text-base-content/70"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  
  type ColorVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  
  interface Props {
    id?: string
    modelValue?: boolean
    label?: string
    description?: string
    disabled?: boolean
    required?: boolean
    indeterminate?: boolean
    size?: 'sm' | 'md' | 'lg'
    defaultChecked?: boolean
    color?: ColorVariant
  }
  
  const props = withDefaults(defineProps<Props>(), {
    id: () => `checkbox-${Math.random().toString(36).substring(2, 11)}`,
    modelValue: undefined,
    label: '',
    description: '',
    disabled: false,
    required: false,
    indeterminate: false,
    size: 'md',
    defaultChecked: false,
    color: 'default' 
  })
  
  const emit = defineEmits(['update:modelValue', 'change'])
  
  // Internal state for the checkbox
  const internalChecked = ref(props.defaultChecked)
  
  // Compute the checked state, prioritizing external v-model if provided
  const isChecked = computed(() => {
    // If modelValue is provided (v-model), use it
    if (props.modelValue !== undefined) {
      return props.modelValue
    }
    // Otherwise, use internal state
    return internalChecked.value
  })
  
  // Watch for changes to modelValue and update internal state
  watch(() => props.modelValue, (newVal) => {
    if (newVal !== undefined) {
      internalChecked.value = newVal
    }
  })
  
  function onChange(event: Event) {
    const target = event.target as HTMLInputElement
    
    if (props.disabled) return
    
    // Update internal state
    internalChecked.value = target.checked
    
    // If modelValue is provided (v-model), emit update
    if (props.modelValue !== undefined) {
      emit('update:modelValue', target.checked)
    }
    
    emit('change', target.checked)
  }
  
  const sizeClasses = computed(() => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
    
    return sizes[props.size]
  })
  
  const labelSizeClasses = computed(() => {
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }
    
    return sizes[props.size]
  })
  
  // Color variants
  const colorClasses = computed(() => {
    const variants = {
      default: {
        bg: 'bg-base-content',
        border: 'border-base-content',
        ring: 'focus-visible:ring-base-content/50'
      },
      primary: {
        bg: 'bg-primary',
        border: 'border-primary',
        ring: 'focus-visible:ring-primary/50'
      },
      secondary: {
        bg: 'bg-secondary',
        border: 'border-secondary',
        ring: 'focus-visible:ring-secondary/50'
      },
      accent: {
        bg: 'bg-accent',
        border: 'border-accent',
        ring: 'focus-visible:ring-accent/50'
      },
      info: {
        bg: 'bg-info',
        border: 'border-info',
        ring: 'focus-visible:ring-info/50'
      },
      success: {
        bg: 'bg-success',
        border: 'border-success',
        ring: 'focus-visible:ring-success/50'
      },
      warning: {
        bg: 'bg-warning',
        border: 'border-warning',
        ring: 'focus-visible:ring-warning/50'
      },
      error: {
        bg: 'bg-error',
        border: 'border-error',
        ring: 'focus-visible:ring-error/50'
      }
    }
    
    return variants[props.color] || variants.default
  })
  </script>