<template>
    <div class="relative inline-block text-left" ref="containerRef">
      <div @click.stop="handleTriggerClick">
        <slot name="trigger" :open="isOpen" :toggle="toggle"></slot>
      </div>
      
      <Teleport to="body">
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div 
            v-if="isOpen" 
            ref="menuRef"
            @click.stop
            class="fixed rounded-md bg-base-100 shadow-lg ring-1 ring-ring/5 focus:outline-none z-100 w-56 py-1 border border-border"
            :style="menuStyle"
          >
            <slot></slot>
          </div>
        </transition>
      </Teleport>
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick } from 'vue'
  
  interface Boundary {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  }
  
  interface Props {
    position?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    offset?: number
    boundary?: Boundary
    autoAdjust?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    position: 'bottom',
    align: 'start',
    offset: 8,
    boundary: () => ({}),
    autoAdjust: true
  })
  
  const isOpen = ref(false)
  const menuRef = ref<HTMLElement | null>(null)
  const containerRef = ref<HTMLElement | null>(null)
  const menuStyle = ref<Record<string, string>>({})
  let triggerElement: HTMLElement | null = null
  
  const toggle = (e?: Event) => {
    if (e) {
      e.stopPropagation()
      triggerElement = e.currentTarget as HTMLElement
    }
    
    isOpen.value = !isOpen.value
    if (isOpen.value) nextTick(updatePosition)
  }
  
  const handleTriggerClick = (e: Event) => {
    triggerElement = e.currentTarget as HTMLElement
    toggle(e)
  }
  
  const updatePosition = () => {
    if (!menuRef.value || !containerRef.value) return
  
    const element = triggerElement || containerRef.value
    const rect = element.getBoundingClientRect()
    const style: Record<string, string> = {}
    
    // Define boundaries for positioning
    const boundaryLeft = props.boundary.left ?? 0
    const boundaryRight = props.boundary.right ?? window.innerWidth
    const boundaryTop = props.boundary.top ?? 0
    const boundaryBottom = props.boundary.bottom ?? window.innerHeight
    
    // Set position
    const isVertical = props.position === 'top' || props.position === 'bottom'
    
    if (props.position === 'top') style.bottom = `${window.innerHeight - rect.top + props.offset}px`
    else if (props.position === 'bottom') style.top = `${rect.bottom + props.offset}px`
    else if (props.position === 'right') style.left = `${Math.max(rect.right, boundaryLeft) + props.offset}px`
    else if (props.position === 'left') style.right = `${window.innerWidth - rect.left + props.offset}px`
    
    // Set alignment
    if (props.align === 'start') {
      if (isVertical) style.left = `${Math.max(rect.left, boundaryLeft)}px`
      else style.top = `${rect.top}px`
    } 
    else if (props.align === 'center') {
      if (isVertical) {
        style.left = `${Math.max(rect.left + rect.width / 2, boundaryLeft)}px`
        style.transform = 'translateX(-50%)'
      } else {
        style.top = `${rect.top + rect.height / 2}px`
        style.transform = 'translateY(-50%)'
      }
    } 
    else if (props.align === 'end') {
      if (isVertical) style.right = `${window.innerWidth - rect.right}px`
      else style.bottom = `${window.innerHeight - rect.bottom}px`
    }
    
    menuStyle.value = style
    
    // Auto-adjustment for viewport boundaries
    if (props.autoAdjust) {
      nextTick(() => {
        if (!menuRef.value) return
        
        const menuRect = menuRef.value.getBoundingClientRect()
        const adjusted: Record<string, string> = { ...menuStyle.value }
        
        // Horizontal adjustment
        if (menuRect.right > boundaryRight) {
          delete adjusted.left
          adjusted.right = '16px'
          delete adjusted.transform
        } else if (menuRect.left < boundaryLeft) {
          delete adjusted.right
          adjusted.left = `${boundaryLeft + 16}px`
          delete adjusted.transform
        }
        
        // Vertical adjustment
        if (menuRect.bottom > boundaryBottom) {
          delete adjusted.top
          adjusted.bottom = '16px'
          delete adjusted.transform
        } else if (menuRect.top < boundaryTop) {
          delete adjusted.bottom
          adjusted.top = '16px'
          delete adjusted.transform
        }
        
        menuStyle.value = adjusted
      })
    }
  }
  
  const close = (e: MouseEvent) => {
    if ((menuRef.value && menuRef.value.contains(e.target as Node)) || 
        (containerRef.value && containerRef.value.contains(e.target as Node))) {
      return
    }
    isOpen.value = false
  }
  
  onMounted(() => {
    document.addEventListener('mousedown', close)
    window.addEventListener('resize', updatePosition)
  })
  
  onUnmounted(() => {
    document.removeEventListener('mousedown', close)
    window.removeEventListener('resize', updatePosition)
  })
  </script>