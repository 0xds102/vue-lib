<!-- components/ui/theme-toggler/ThemeToggler.vue -->
<template>
    <button 
      @click="toggleTheme" 
      class="h-9 w-9 rounded-md flex items-center justify-center text-base-content hover:bg-neutral transition-colors"
      aria-label="Toggle theme"
    >
      <!-- Sun icon for dark mode (show when in dark mode) -->
      <svg 
        v-if="isDarkMode" 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fill-rule="evenodd" 
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
          clip-rule="evenodd"
        />
      </svg>
      
      <!-- Moon icon for light mode (show when in light mode) -->
      <svg 
        v-else 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  // Theme state
  const isDarkMode = ref(false);
  
  // Initialize theme from localStorage or system preference
  onMounted(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      isDarkMode.value = storedTheme === 'dark';
    } else {
      // Fall back to system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply initial theme
    applyTheme();
  });
  
  // Watch for changes to apply theme
  watch(isDarkMode, () => {
    applyTheme();
  });
  
  // Toggle theme function
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  };
  
  // Apply theme to document
  const applyTheme = () => {
    const htmlElement = document.documentElement;
    
    if (isDarkMode.value) {
      htmlElement.classList.add('dark-theme');
      htmlElement.classList.remove('light-theme');
    } else {
      htmlElement.classList.add('light-theme');
      htmlElement.classList.remove('dark-theme');
    }
  };
  </script>