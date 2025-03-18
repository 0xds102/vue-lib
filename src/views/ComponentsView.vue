<template>
    <div class="container mx-auto py-8 px-4 ml-[280px] transition-all duration-300" :class="sidebarCollapsed ? 'ml-[72px]' : 'ml-[280px]'">
     
  
      <!-- Components Showcase -->
      <div class="space-y-6 mb-8">
  
            <h2 class="text-2xl font-bold mb-2">Inputs</h2>
            <Input placeholder="Enter your name" class="max-w-xs"/>
            <DatePicker v-model="selectedDate" placeholder="Select a date" class="max-w-xs" />
       
      
            <h2 class="text-2xl font-bold mb-4">Buttons</h2>
            <div class="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="error">Error</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>

            <h2 class="text-2xl font-bold mb-4">Dialog</h2>
            <div class="flex flex-wrap gap-4">
            <Dialog>
                <DialogTrigger>
                <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent title="Example Dialog">
                <p class="mb-4">This is an example dialog component.</p>
                </DialogContent>
            </Dialog>
            </div>

            <h2 class="text-2xl font-bold mb-2">Textarea</h2>
            <Textarea placeholder="Enter your message" class="max-w-md"/>
            <Textarea placeholder="Smaller textarea" :rows="2" class="max-w-md mt-2"/>

            <h2 class="text-2xl font-bold mb-4">Dropdown Menu</h2>
            <div class="flex flex-wrap gap-4 mb-8">
  <DropdownMenu>
    <template #trigger="{ toggle }">
      <Button @click.stop="toggle">Basic Dropdown</Button>
    </template>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenu>
  
  <!-- Different positions -->
  <DropdownMenu position="top" :autoPosition="false">
    <template #trigger="{ toggle }">
      <Button @click.stop="toggle">Top Position</Button>
    </template>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenu>
  
  <DropdownMenu position="right" :autoPosition="false">
    <template #trigger="{ toggle }">
      <Button @click.stop="toggle">Right Position</Button>
    </template>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenu>
  
  <DropdownMenu position="bottom" align="center" :autoPosition="false">
    <template #trigger="{ toggle }">
      <Button @click.stop="toggle">Bottom Center</Button>
    </template>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenu>
</div>

      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { DatePicker } from '@/components/ui/datepicker'
  import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
  import { Textarea } from '@/components/ui/textarea'
  import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'

  

  const selectedDate = ref()
  const showDialog = ref(false)

  const dropdownOpen = ref(false)

// Add this to handle outside clicks
onMounted(() => {
  document.addEventListener('click', () => {
    dropdownOpen.value = false
  })
})

onUnmounted(() => {
  document.removeEventListener('click', () => {})
})
  </script>