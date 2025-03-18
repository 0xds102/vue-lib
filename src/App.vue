<template>
  <Sidebar v-model:collapsed="sidebarCollapsed">
    <!-- Header with responsive layout -->
    <template #header="{ collapsed }">
      <div class="flex items-center gap-3" :class="{ 'justify-center w-full': collapsed }">
        <!-- Logo - always visible -->
        <div class="h-8 w-8 rounded bg-primary shrink-0 flex items-center justify-center text-base-100">0x</div>
        
        <!-- Organization text - only visible when expanded -->
        <div v-if="!collapsed" class="min-w-0">
          <div class="text-sm font-medium truncate">Test Dao</div>
        </div>
      </div>
    </template>
    
    <!-- Regular sidebar items -->
    <SidebarItem title="Dashboard" :icon="PhSquaresFour" href="/" />
    <SidebarItem title="Components" :icon="PhCirclesThree" href="/components" />
    
    <SidebarItem title="Options 1" isSection />
    
    <SidebarItem title="Test1" :icon="PhGameController">
      <template #children>
        <SidebarItem title="Hey" collapsible />
      </template>
    </SidebarItem>
    
    <SidebarItem title="Test2" :icon="PhCube" />
    <SidebarItem title="Test3" :icon="PhBook" />
  
    
    <SidebarItem title="Options 2" isSection />
    <SidebarItem title="Test4" :icon="PhPaintBrush" />
    <SidebarItem title="Test5" :icon="PhChartLine" />

    <!-- Footer with responsive layout -->
    <template #footer="{ collapsed }">
  <div class="flex items-center gap-3" :class="{ 'justify-center': collapsed }">
    <!-- Avatar with dropdown menu -->
    <DropdownMenu position="right" :boundary="{ left: sidebarCollapsed ? 72 : 260 }">
      <template #trigger="{ toggle }">
        <!-- Entire user section is now clickable -->
        <div 
          @click="(e) => toggle(e)" 
          class="flex items-center gap-3 p-1 rounded-md cursor-pointer hover:bg-slate-100 transition-colors"
          :class="{ 'justify-center': collapsed, 'w-full': !collapsed }"
        >
          <!-- Avatar - always visible -->
          <div class="h-8 w-8 rounded-full bg-primary overflow-hidden shrink-0">
            <div class="h-full w-full flex items-center text-base-100 justify-center">0x</div>
          </div>
          
          <!-- User info - only visible when expanded -->
          <div v-if="!collapsed" class="min-w-0">
            <div class="text-sm font-medium truncate">0xtest</div>
            <div class="text-xs text-slate-500 truncate">test@example.com</div>
          </div>
        </div>
      </template>
      
      <!-- Dropdown menu items -->
      <DropdownMenuItem href="/profile">Profile</DropdownMenuItem>
      <DropdownMenuItem href="/settings">Settings</DropdownMenuItem>
      <DropdownMenuItem href="/account">Account</DropdownMenuItem>
      <div class="border-t border-slate-200 my-1"></div>
      <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
    </DropdownMenu>
  </div>
</template>
  </Sidebar>
  
  <!-- Router view to display the current page -->
  <router-view />
</template>

<script setup>
import { ref } from 'vue'
import { Sidebar, SidebarItem } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { 
  PhSquaresFour,
  PhGameController, 
  PhCube, 
  PhBook, 
  PhGear, 
  PhPaintBrush, 
  PhChartLine,
  PhCirclesThree
} from '@phosphor-icons/vue'

const sidebarCollapsed = ref(false)

const logout = () => {
  console.log('Logging out...')
  // Add your logout logic here
}
</script>