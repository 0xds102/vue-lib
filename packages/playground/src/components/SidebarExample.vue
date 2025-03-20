<template>
    <Sidebar v-model:collapsed="sidebarCollapsed">
      <!-- Header with responsive layout -->
      <template #header="{ collapsed }">
        <div class="h-8 w-8 rounded bg-primary shrink-0 flex items-center justify-center text-base-100">0x</div>
        
        <div 
          class="ml-3 overflow-hidden transition-opacity duration-300"
          :class="collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'"
        >
          <div class="text-sm font-medium whitespace-nowrap">Test Dao</div>
        </div>
      </template>
      
      <!-- Regular sidebar items -->
      <SidebarItem title="Dashboard" :icon="PhSquaresFour" href="/" />
      <SidebarItem title="Components" :icon="PhCirclesThree" href="/components" />
      
      <SidebarItem title="Options 1" isSection />
      
      <SidebarItem title="Test1" :icon="PhGameController">
        <template #children>
          <SidebarItem title="Test1.1" collapsible />
          <SidebarItem title="Test1.2" collapsible />
          <SidebarItem title="Test1.3" collapsible />
        </template>
      </SidebarItem>
      
      <SidebarItem title="Test2" :icon="PhCube" />
      <SidebarItem title="Test3" :icon="PhBook" />
    
      <SidebarItem title="Options 2" isSection />
      <SidebarItem title="Documentation" :icon="PhBook" href="/docs" />
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
      
      <!-- User profile section at the top of dropdown -->
      <div class="px-4 py-3 border-b border-border mb-1">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-primary overflow-hidden shrink-0">
            <div class="h-full w-full flex items-center text-base-100 justify-center">0x</div>
          </div>
          <div>
            <div class="text-sm font-medium">0xtest</div>
            <div class="text-xs text-neutral-content">m@example.com</div>
          </div>
        </div>
      </div>
      
      <div class="py-1">
        <DropdownMenuItem href="/account">
          <div class="flex items-center gap-2">
            <PhUserCircle :size="18" class="text-base-content" />
            <span>Account</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem href="/settings">
          <div class="flex items-center gap-2">
            <PhGear :size="18" class="text-base-content" />
            <span>Settings</span>
          </div>
        </DropdownMenuItem>
        
        <div class="border-t border-border my-1"></div>
        
        <DropdownMenuItem @click="logout" class="group">
          <div class="flex items-center gap-2">
            <PhSignOut :size="18" class="text-base-content group-hover:text-error transition-colors" />
            <span class="group-hover:text-error transition-colors">Log out</span>
          </div>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </div>
</template>
    </Sidebar>
  </template>
  
  <script setup>
  import { ref } from 'vue'
import { Sidebar, SidebarItem } from '@components/sidebar'
import { DropdownMenu, DropdownMenuItem } from '@components/dropdown-menu'
  import { 
    PhSquaresFour,
    PhGameController, 
    PhCube, 
    PhBook, 
    PhGear, 
    PhPaintBrush, 
    PhChartLine,
    PhCirclesThree,
    PhUserCircle,
    PhSignOut
  } from '@phosphor-icons/vue'
  
  const sidebarCollapsed = ref(false)
  
  const logout = () => {
    console.log('Logging out...')
  }
  </script>