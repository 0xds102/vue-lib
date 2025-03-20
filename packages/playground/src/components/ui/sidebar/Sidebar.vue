<template>
  <div class="relative">
    <aside data-sidebar :class="[
      'h-screen fixed inset-y-0 left-0 z-40 flex flex-col bg-base-100 border-r border-border',
      'transition-[width] duration-300 ease-in-out',
      className
    ]" :style="{ width: collapsed ? '72px' : width }">
      <!-- Header -->
      <div class="flex items-center p-4 border-b border-border overflow-hidden">
        <div class="w-full flex" :class="{ 'justify-center': collapsed, 'justify-start': !collapsed }">
          <!-- For collapsed state: center the logo -->
          <div v-if="collapsed" class="h-8 w-8">
            <slot name="header" :collapsed="collapsed"></slot>
          </div>

          <!-- For expanded state: left-align the header content -->
          <div v-else class="flex items-center">
            <slot name="header" :collapsed="collapsed"></slot>
          </div>
        </div>
      </div>
      <!-- Main content with scrolling and spacing -->
      <div class="flex-1 overflow-y-auto py-4 space-y-2">
        <div :class="{ 'flex flex-col items-center': collapsed }">
          <slot></slot>
        </div>
      </div>

      <!-- User profile footer with transition -->
      <div class="p-4 border-t border-border overflow-hidden transition-all duration-300 ease-in-out">
        <slot name="footer" :collapsed="collapsed"></slot>
      </div>

      <!-- Repositioned toggle button -->
      <button v-if="showCollapseToggle" @click="toggleCollapse"
        class="absolute z-50 flex items-center justify-center rounded-full bg-base-100 border border-border shadow-sm p-1.5 text-base-content hover:border-primary cursor-pointer"
        :style="{
          top: '48px',
          right: '-14px',
          height: '28px',
          width: '28px',
          transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)'
        }">
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