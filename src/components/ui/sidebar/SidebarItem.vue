<template>
  <!-- Skip rendering sections completely when collapsed -->
  <template v-if="!(isSection && sidebarCollapsed)">
    <div class="mb-1">
      <!-- Section Header - only show when not collapsed -->
      <h3 v-if="isSection" class="px-4 py-2 text-xs font-semibold text-neutral-content uppercase mt-4">
        {{ title }}
      </h3>

      <!-- Standard Item -->
      <div v-else-if="!hasChildren" :class="{ 'px-2': true, 'my-1': true }">
        <a 
          :href="href" 
          :class="[
            'flex items-center text-sm rounded-md',
            sidebarCollapsed ? 'justify-center w-12 h-12' : 'gap-3 px-3 py-2',
            collapsible && !sidebarCollapsed ? 'pl-8 hover:text-primary transition-colors' : 'hover:bg-neutral/50',
            isActive ? (collapsible && !sidebarCollapsed ? 'text-primary font-medium' : 'bg-neutral/50 font-medium') : '',
          ]"
          :title="sidebarCollapsed ? title : ''"
        >
          <!-- Icon with direct prop passing and conditional color -->
          <component 
            v-if="icon" 
            :is="icon" 
            :size="iconSize" 
            :class="[
              'shrink-0',
              isActive ? 'text-primary' : 'text-neutral-content'
            ]"
          />
          
          <slot v-else-if="$slots.icon" name="icon"></slot>
          
          <span v-if="!sidebarCollapsed">{{ title }}</span>
          <slot v-if="!sidebarCollapsed"></slot>
        </a>
      </div>

      <!-- Group with children -->
      <div v-else :class="{ 'px-2': true, 'my-1': true }">
        <button 
          @click="sidebarCollapsed ? null : isExpanded = !isExpanded" 
          :class="[
            'flex items-center text-sm rounded-md',
            sidebarCollapsed ? 'justify-center w-12 h-12' : 'justify-between w-full px-3 py-2 hover:bg-neutral/50',
            isActive ? 'bg-neutral/50 font-medium' : ''
          ]"
          :title="sidebarCollapsed ? title : ''"
        >
          <div class="flex items-center gap-3" :class="{ 'gap-0': sidebarCollapsed }">
            <!-- Icon with direct prop passing and conditional color -->
            <component 
              v-if="icon" 
              :is="icon" 
              :size="iconSize" 
              :class="[
                'shrink-0',
                isActive ? 'text-primary' : 'text-neutral-content'
              ]"
            />
            
            <slot v-else-if="$slots.icon" name="icon"></slot>
            
            <span v-if="!sidebarCollapsed">{{ title }}</span>
          </div>
          
          <!-- Chevron icon for dropdown (hidden when collapsed) -->
          <svg 
            v-if="!sidebarCollapsed"
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 transition-transform duration-200 text-neutral-content" 
            :class="{ 'rotate-180': isExpanded }"
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <!-- Children content (only show when not collapsed) -->
        <div v-show="!sidebarCollapsed && isExpanded" class="mt-1">
          <slot name="children"></slot>
        </div>
      </div>
    </div>
  </template>
</template>
  
  <script setup lang="ts">
  import { ref, computed, useSlots, inject } from 'vue'
  import { useRoute } from 'vue-router'
  import type { Component } from 'vue'
  
  interface Props {
    title: string
    href?: string
    active?: boolean
    collapsible?: boolean
    defaultOpen?: boolean
    isSection?: boolean
    icon?: Component
    iconSize?: number
  }
  
  const props = withDefaults(defineProps<Props>(), {
    href: '#',
    active: false,
    collapsible: false,
    defaultOpen: false,
    isSection: false,
    icon: undefined,
    iconSize: 20
  })
  
  // Get the current route
  const route = useRoute()
  
  // Check if this item is active based on route or props
  const isActive = computed(() => {
    // If active prop is explicitly set to true, use that
    if (props.active) return true
    
    // Check if the href matches the current route path
    if (props.href && props.href !== '#') {
      // Handle root path special case
      if (props.href === '/' && route.path === '/') {
        return true
      }
      // For other paths, check if the current route starts with this href
      // This handles nested routes where we want the parent to be active too
      return props.href !== '/' && route.path.startsWith(props.href)
    }
    
    return false
  })
  
  // Get the collapsed state from the parent Sidebar
  const sidebarCollapsed = inject('sidebarCollapsed', ref(false))
  
  const isExpanded = ref(props.defaultOpen)
  const slots = useSlots()
  
  // Check if slot children exist
  const hasChildren = computed(() => !!slots.children)
  </script>