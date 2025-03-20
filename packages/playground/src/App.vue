<template>
  <div class="flex h-screen">
    <!-- Main sidebar -->
    <SidebarExample />
    
    <!-- Main content area -->
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import SidebarExample from '@/components/SidebarExample.vue'

// Create a reactive reference to track sidebar state
// We're assuming your SidebarExample already has this as a ref
const sidebarCollapsed = ref(false)

// Provide it to child components
provide('sidebarCollapsed', sidebarCollapsed)
</script>