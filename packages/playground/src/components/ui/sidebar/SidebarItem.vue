<template>
  <!-- When rendering as a dropdown item -->
  <DropdownMenuItem 
    v-if="renderMode === 'dropdown-item'"
    :href="href" 
    :active="active"
    @click="$emit('click', $event)"
  >
    <div class="flex items-center gap-2">
      <component 
        v-if="icon" 
        :is="icon" 
        :size="iconSize - 2" 
        class="shrink-0"
      />
      {{ title }}
    </div>
  </DropdownMenuItem>
  
  <!-- Skip rendering sections completely when collapsed -->
  <template v-else-if="!(isSection && sidebarCollapsed)">
    <div class="mb-1">
      <!-- Section Header - only show when not collapsed -->
      <h3 v-if="isSection" class="px-4 py-2 text-xs font-semibold text-neutral-content uppercase mt-4">
        {{ title }}
      </h3>

      <!-- Standard Item -->
      <div v-else-if="!hasChildren" :class="{ 'px-2': true, 'my-1': true }">
        <Tooltip 
          v-if="sidebarCollapsed" 
          :content="title" 
          position="right" 
          :delay="200"
          :offset="8"
          :boundary="{ left: 72 }"
        >
          <a 
            :href="href" 
            :class="[
              'flex items-center text-sm rounded-md',
              'justify-center mx-auto w-10 h-10',
              collapsible ? 'hover:text-primary transition-colors' : 'hover:bg-neutral/50',
              active ? (collapsible ? 'text-primary font-medium' : 'bg-neutral/50 font-medium') : '',
            ]"
            @click="$emit('click', $event)"
          >
            <!-- Icon with direct prop passing and conditional color -->
            <component 
              v-if="icon" 
              :is="icon" 
              :size="iconSize" 
              :class="[
                'shrink-0',
                active ? 'text-primary' : 'text-neutral-content'
              ]"
            />
            
            <slot v-else-if="$slots.icon" name="icon"></slot>
          </a>
        </Tooltip>
        
        <a 
          v-else
          :href="href" 
          :class="[
            'flex items-center text-sm rounded-md',
            'gap-3 px-3 py-2',
            collapsible ? 'pl-8 hover:text-primary transition-colors' : 'hover:bg-neutral/50',
            active ? (collapsible ? 'text-primary font-medium' : 'bg-neutral/50 font-medium') : '',
          ]"
          @click="$emit('click', $event)"
        >
          <!-- Icon with direct prop passing and conditional color -->
          <component 
            v-if="icon" 
            :is="icon" 
            :size="iconSize" 
            :class="[
              'shrink-0',
              active ? 'text-primary' : 'text-neutral-content'
            ]"
          />
          
          <slot v-else-if="$slots.icon" name="icon"></slot>
          
          <span>{{ title }}</span>
          <slot></slot>
        </a>
      </div>

      <!-- Group with children -->
      <div v-else :class="{ 'px-2': true, 'my-1': true }">
        <!-- Use DropdownMenu when sidebar is collapsed -->
        <DropdownMenu v-if="sidebarCollapsed" position="right" :boundary="{ left: sidebarCollapsed ? 72 : 260 }">
          <template #trigger="{ toggle }">
            <Tooltip 
              :content="title" 
              position="right" 
              :delay="200"
              :offset="8"
              :boundary="{ left: 72 }"
            >
              <button 
                @click="toggle"
                :class="[
                  'flex items-center justify-center text-sm rounded-md w-10 h-10 mx-auto',
                  'hover:bg-neutral/50 transition-colors cursor-pointer', 
                  active ? 'bg-neutral/50 font-medium' : ''
                ]"
              >
                <component 
                  v-if="icon" 
                  :is="icon" 
                  :size="iconSize" 
                  :class="[
                    'shrink-0',
                    active ? 'text-primary' : 'text-neutral-content'
                  ]"
                />
              </button>
            </Tooltip>
          </template>
          
          <div class="py-1">
            <!-- Provide nested context -->
            <slot name="children"></slot>
          </div>
        </DropdownMenu>

        <!-- Normal expandable menu when sidebar is expanded -->
        <template v-else>
          <button 
            @click="isExpanded = !isExpanded" 
            :class="[
              'flex items-center text-sm rounded-md justify-between w-full px-3 py-2 hover:bg-neutral/50 transition-colors',
              active ? 'bg-neutral/50 font-medium' : ''
            ]"
          >
            <div class="flex items-center gap-3">
              <component 
                v-if="icon" 
                :is="icon" 
                :size="iconSize" 
                :class="[
                  'shrink-0',
                  active ? 'text-primary' : 'text-neutral-content'
                ]"
              />
              
              <slot v-else-if="$slots.icon" name="icon"></slot>
              
              <span>{{ title }}</span>
            </div>
            
            <!-- Chevron icon for dropdown -->
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 transition-transform duration-200 text-neutral-content" 
              :class="{ 'rotate-180': isExpanded }"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- Children content -->
          <div v-show="isExpanded" class="mt-1">
            <slot name="children"></slot>
          </div>
        </template>
      </div>
    </div>
  </template>
</template>
  
<script setup lang="ts">
import { ref, computed, useSlots, inject, provide } from 'vue'
import type { Component } from 'vue'
import { DropdownMenu, DropdownMenuItem } from '../dropdown-menu'
import { Tooltip } from '../tooltip'

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

// Get the collapsed state from the parent Sidebar
const sidebarCollapsed = inject('sidebarCollapsed', ref(false))

// Check if we're in dropdown context 
const parentDropdownActive = inject('inDropdownMenu', false)

// Determine render mode based on context
const renderMode = computed(() => {
  if (parentDropdownActive && sidebarCollapsed.value) {
    return 'dropdown-item'
  }
  return 'normal'
})

// Provide dropdown context to children
provide('inDropdownMenu', computed(() => {
  // Only activate dropdown context for children when sidebar is collapsed and
  // this component has the dropdown menu open (is being rendered in dropdown)
  return sidebarCollapsed.value && hasChildren.value
}))

const isExpanded = ref(props.defaultOpen)
const slots = useSlots()

// Check if slot children exist
const hasChildren = computed(() => !!slots.children)

// Define emits
defineEmits(['click'])
</script>