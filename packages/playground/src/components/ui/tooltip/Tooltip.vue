<template>
    <div ref="containerRef" class="relative inline-block">
      <!-- Trigger element -->
      <div 
        @mouseenter="showTooltip" 
        @mouseleave="hideTooltip"
        @focus="showTooltip"
        @blur="hideTooltip"
      >
        <slot></slot>
      </div>
      
      <!-- Tooltip -->
      <Teleport to="body">
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="isVisible"
            ref="tooltipRef"
            class="fixed z-50 px-2 py-1 text-xs font-medium rounded shadow-sm max-w-xs whitespace-normal break-words"
            :class="[variantClasses]"
            :style="tooltipStyle"
          >
            <!-- Arrow pointer based on position -->
            <div 
              class="absolute w-2 h-2 rotate-45 transform"
              :class="[arrowPositionClass, arrowVariantClass]"
            ></div>
            
            <!-- Content -->
            <div class="relative z-10">
              {{ content }}
              <slot name="content"></slot>
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
  
  interface Boundary {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  }
  
  const props = withDefaults(defineProps<{
    content?: string
    position?: 'top' | 'right' | 'bottom' | 'left'
    variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
    delay?: number
    boundary?: Boundary
    autoAdjust?: boolean
    offset?: number
  }>(), {
    content: '',
    position: 'top',
    variant: 'default',
    delay: 300,
    boundary: () => ({}),
    autoAdjust: true,
    offset: 12
  })
  
  const isVisible = ref(false)
  const tooltipRef = ref<HTMLElement | null>(null)
  const containerRef = ref<HTMLElement | null>(null)
  const tooltipStyle = ref<Record<string, string>>({})
  let showTimeout: ReturnType<typeof setTimeout> | null = null
  
  // Variant classes mapping
  const variantClasses = computed(() => {
    switch (props.variant) {
      case 'primary': return 'bg-primary text-primary-content'
      case 'secondary': return 'bg-secondary text-secondary-content'
      case 'accent': return 'bg-accent text-accent-content'
      case 'info': return 'bg-info text-info-content'
      case 'success': return 'bg-success text-success-content' 
      case 'warning': return 'bg-warning text-warning-content'
      case 'error': return 'bg-error text-error-content'
      default: return 'bg-base-content text-base-100'
    }
  })
  
  // Matching arrow background
  const arrowVariantClass = computed(() => {
    switch (props.variant) {
      case 'primary': return 'bg-primary'
      case 'secondary': return 'bg-secondary'
      case 'accent': return 'bg-accent'
      case 'info': return 'bg-info'
      case 'success': return 'bg-success'
      case 'warning': return 'bg-warning'
      case 'error': return 'bg-error'
      default: return 'bg-base-content'
    }
  })
  
  // Arrow positioning class based on tooltip position
  const arrowPositionClass = computed(() => {
    switch (props.position) {
      case 'top': return 'bottom-[-4px] left-1/2 -ml-1'
      case 'bottom': return 'top-[-4px] left-1/2 -ml-1'
      case 'left': return 'right-[-4px] top-1/2 -mt-1'
      case 'right': return 'left-[-4px] top-1/2 -mt-1'
      default: return 'left-[-4px] top-1/2 -mt-1'
    }
  })
  
  const showTooltip = () => {
    if (showTimeout) clearTimeout(showTimeout)
    
    showTimeout = setTimeout(() => {
      isVisible.value = true
      nextTick(updatePosition)
    }, props.delay)
  }
  
  const hideTooltip = () => {
    if (showTimeout) {
      clearTimeout(showTimeout)
      showTimeout = null
    }
    isVisible.value = false
  }
  
  const updatePosition = () => {
    if (!tooltipRef.value || !containerRef.value) return
    
    const triggerRect = containerRef.value.getBoundingClientRect()
    const tooltipRect = tooltipRef.value.getBoundingClientRect()
    const style: Record<string, string> = {}
    
    // Define boundaries for positioning
    const boundaryLeft = props.boundary.left ?? 0
    const boundaryRight = props.boundary.right ?? window.innerWidth
    const boundaryTop = props.boundary.top ?? 0
    const boundaryBottom = props.boundary.bottom ?? window.innerHeight
    
    // Default position based on prop
    const halfTriggerWidth = triggerRect.width / 2
    const halfTriggerHeight = triggerRect.height / 2
    const halfTooltipWidth = tooltipRect.width / 2
    const halfTooltipHeight = tooltipRect.height / 2
    
    if (props.position === 'top') {
      style.bottom = `${window.innerHeight - triggerRect.top + props.offset}px`
      style.left = `${triggerRect.left + halfTriggerWidth - halfTooltipWidth}px`
    } else if (props.position === 'bottom') {
      style.top = `${triggerRect.bottom + props.offset}px`
      style.left = `${triggerRect.left + halfTriggerWidth - halfTooltipWidth}px`
    } else if (props.position === 'left') {
      style.right = `${window.innerWidth - triggerRect.left + props.offset}px`
      style.top = `${triggerRect.top + halfTriggerHeight - halfTooltipHeight}px`
    } else if (props.position === 'right') {
      style.left = `${triggerRect.right + props.offset}px`
      style.top = `${triggerRect.top + halfTriggerHeight - halfTooltipHeight}px`
    }
    
    tooltipStyle.value = style
    
    // Auto-adjustment for viewport boundaries
    if (props.autoAdjust) {
      nextTick(() => {
        if (!tooltipRef.value) return
        
        const tooltipRect = tooltipRef.value.getBoundingClientRect()
        const adjusted: Record<string, string> = { ...tooltipStyle.value }
        
        // Horizontal adjustment
        if (tooltipRect.right > boundaryRight) {
          adjusted.left = `${boundaryRight - tooltipRect.width - 8}px`
          delete adjusted.right
        } else if (tooltipRect.left < boundaryLeft) {
          adjusted.left = `${boundaryLeft + 8}px`
          delete adjusted.right
        }
        
        // Vertical adjustment
        if (tooltipRect.bottom > boundaryBottom) {
          adjusted.top = `${boundaryBottom - tooltipRect.height - 8}px`
          delete adjusted.bottom
        } else if (tooltipRect.top < boundaryTop) {
          adjusted.top = `${boundaryTop + 8}px`
          delete adjusted.bottom
        }
        
        tooltipStyle.value = adjusted
      })
    }
  }
  
  // Handle window resize
  const onResize = () => {
    if (isVisible.value) {
      updatePosition()
    }
  }
  
  onMounted(() => {
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', updatePosition, true)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', updatePosition, true)
    
    if (showTimeout) {
      clearTimeout(showTimeout)
    }
  })
  </script>