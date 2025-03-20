<!-- components/layout/DefaultLayout.vue -->
<template>
  <div class="flex h-screen w-full">
    <!-- Sidebar -->
    <SidebarExample />

    <!-- Content area that starts after the sidebar -->
    <div class="flex-1 flex flex-col">
      <!-- Header with theme toggle -->
      <header class="h-16 px-6 flex items-center justify-between">
        <h1 class="text-lg font-medium text-base-content">Dev Environment</h1>
        
        <!-- Theme toggler in the right side -->
        <ThemeToggle />
      </header>

      <!-- Main content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import SidebarExample from '@/components/SidebarExample.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

// Create a reactive reference to track sidebar state
const sidebarCollapsed = ref(false);

// Provide it to child components
provide('sidebarCollapsed', sidebarCollapsed);
</script>