<template>
  <SidebarExample />
  
  <!-- Router view to display the current page -->
  <router-view />
</template>

<script setup>
import SidebarExample from '@/components/examples/SidebarExample.vue'
</script>