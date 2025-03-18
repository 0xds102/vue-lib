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
            class="fixed rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] w-56 py-1 border border-slate-200"
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
  
  interface Props {
    position?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    offset?: number
  }
  
  const props = withDefaults(defineProps<Props>(), {
    position: 'bottom',
    align: 'start',
    offset: 8
  })
  
  const isOpen = ref(false)
  const menuRef = ref<HTMLElement | null>(null)
  const containerRef = ref<HTMLElement | null>(null)
  const menuStyle = ref({})
  let triggerElement: HTMLElement | null = null
  
  const toggle = (e?: Event) => {
    if (e) {
      e.stopPropagation()
      // Save the triggering element when toggling
      triggerElement = e.currentTarget as HTMLElement
    }
    
    isOpen.value = !isOpen.value
    
    if (isOpen.value) {
      nextTick(() => {
        updatePosition()
      })
    }
  }
  
  const handleTriggerClick = (e: Event) => {
    // Store a reference to the element that was clicked
    triggerElement = e.currentTarget as HTMLElement
    toggle(e)
  }
  
  const updatePosition = () => {
    if (!menuRef.value || !containerRef.value) return
  
    // Use the container element as fallback if no specific trigger is stored
    const element = triggerElement || containerRef.value
    const rect = element.getBoundingClientRect()
    
    const style: Record<string, string> = {}
    
    // For sidebar context, we need to ensure it's outside the sidebar
    const sidebar = document.querySelector('[data-sidebar]')
    const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0
    
    // Position based on specified direction
    switch (props.position) {
      case 'top':
        style.bottom = `${window.innerHeight - rect.top + props.offset}px`
        break
      case 'right':
        // Ensure it's positioned outside the sidebar
        if (rect.left < sidebarWidth) {
          style.left = `${Math.max(rect.right, sidebarWidth) + props.offset}px`
        } else {
          style.left = `${rect.right + props.offset}px`
        }
        break
      case 'bottom':
        style.top = `${rect.bottom + props.offset}px`
        break
      case 'left':
        style.right = `${window.innerWidth - rect.left + props.offset}px`
        break
    }
    
    // Alignment
    switch (props.align) {
      case 'start':
        if (props.position === 'top' || props.position === 'bottom') {
          style.left = `${Math.max(rect.left, sidebarWidth)}px`
        } else {
          style.top = `${rect.top}px`
        }
        break
      case 'center':
        if (props.position === 'top' || props.position === 'bottom') {
          style.left = `${Math.max(rect.left + rect.width / 2, sidebarWidth)}px`
          style.transform = 'translateX(-50%)'
        } else {
          style.top = `${rect.top + rect.height / 2}px`
          style.transform = 'translateY(-50%)'
        }
        break
      case 'end':
        if (props.position === 'top' || props.position === 'bottom') {
          style.right = `${window.innerWidth - rect.right}px`
        } else {
          style.bottom = `${window.innerHeight - rect.bottom}px`
        }
        break
    }
    
    menuStyle.value = style
    
    // Check boundaries after positioning and adjust if needed
    nextTick(() => {
      if (!menuRef.value) return
      
      const menuRect = menuRef.value.getBoundingClientRect()
      const adjustedStyle = { ...menuStyle.value }
      
      // Adjust horizontal positioning if needed
      if (menuRect.right > window.innerWidth) {
        delete adjustedStyle.left
        adjustedStyle.right = '16px'
        delete adjustedStyle.transform
      } else if (menuRect.left < sidebarWidth) {
        // Ensure it doesn't overlap with sidebar
        delete adjustedStyle.right
        adjustedStyle.left = `${sidebarWidth + 16}px`
        delete adjustedStyle.transform
      }
      
      // Adjust vertical positioning if needed
      if (menuRect.bottom > window.innerHeight) {
        delete adjustedStyle.top
        adjustedStyle.bottom = '16px'
        delete adjustedStyle.transform
      } else if (menuRect.top < 0) {
        delete adjustedStyle.bottom
        adjustedStyle.top = '16px'
        delete adjustedStyle.transform
      }
      
      menuStyle.value = adjustedStyle
    })
  }
  
  const close = (e: MouseEvent) => {
    // Don't close if clicking inside the dropdown
    if (menuRef.value && menuRef.value.contains(e.target as Node)) {
      return
    }
    
    // Don't close if clicking the trigger (toggle will handle this)
    if (containerRef.value && containerRef.value.contains(e.target as Node)) {
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