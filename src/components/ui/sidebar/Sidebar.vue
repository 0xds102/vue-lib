<template>
  <div class="relative">
    <!-- Sidebar with improved transitions -->
    <aside
      data-sidebar
      :class="[
        'h-screen fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200',
        'transition-all duration-300 ease-in-out',
        className
      ]"
      :style="{ width: collapsed ? '72px' : width }"
    >
      <!-- Organization header with transition -->
      <div class="flex items-center p-4 border-b border-slate-200 overflow-hidden transition-all duration-300 ease-in-out">
        <slot name="header" :collapsed="collapsed"></slot>
      </div>

      <!-- Main content with scrolling and spacing -->
      <div class="flex-1 overflow-y-auto py-4 transition-all duration-300 ease-in-out space-y-2">
        <slot></slot>
      </div>

      <!-- User profile footer with transition -->
      <div class="p-4 border-t border-slate-200 overflow-hidden transition-all duration-300 ease-in-out">
        <slot name="footer" :collapsed="collapsed"></slot>
      </div>
      
      <!-- Repositioned toggle button -->
      <button 
  v-if="showCollapseToggle"
  @click="toggleCollapse" 
  class="absolute z-50 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm p-1.5 text-slate-700 hover:bg-slate-50"
  :style="{
    top: '48px', /* Adjusted from 24px to 48px for better positioning */
    right: '-14px',
    height: '28px',
    width: '28px',
    transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)'
  }"
>
  <PhCaretRight :size="16" />
</button>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { PhCaretRight } from '@phosphor-icons/vue'

interface Props {
  width?: string
  className?: string
  defaultCollapsed?: boolean
  showCollapseToggle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '260px',
  className: '',
  defaultCollapsed: false,
  showCollapseToggle: true
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const collapsed = ref(props.defaultCollapsed)

// Provide the collapsed state for child components
provide('sidebarCollapsed', collapsed)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
  emit('update:collapsed', collapsed.value)
}
</script>