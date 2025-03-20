<template>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Button Component</h1>
      
      <!-- Basic Buttons -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Basic Variants</h2>
        <div class="p-6 border border-border rounded-lg bg-base-200">
          <div class="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="error">Error</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <pre class="text-sm"><code>{{ buttonExampleCode }}</code></pre>
        </div>
      </section>
      
      <!-- Sizes -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Sizes</h2>
        <div class="p-6 border border-border rounded-lg bg-base-200">
          <div class="flex items-center flex-wrap gap-4">
            <Button size="sm" variant="primary">Small</Button>
            <Button variant="primary">Default</Button>
            <Button size="lg" variant="primary">Large</Button>
          </div>
        </div>
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <pre class="text-sm"><code>{{ buttonSizeCode }}</code></pre>
        </div>
      </section>
      
      <!-- With Icons -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">With Icons</h2>
        <div class="p-6 border border-border rounded-lg bg-base-200">
          <div class="flex flex-wrap gap-4">
            <Button variant="primary" class="flex items-center gap-2">
              <PhPlus :size="16" />
              <span>Add Item</span>
            </Button>
            <Button variant="secondary" class="flex items-center gap-2">
              <PhTrash :size="16" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <pre class="text-sm"><code>{{ buttonIconCode }}</code></pre>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { Button } from '../components/ui/button'
  import { PhPlus, PhTrash } from '@phosphor-icons/vue'
  
  // Example code for display
  const buttonExampleCode = `<Button>Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="accent">Accent</Button>
  <Button variant="error">Error</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>`
  
  const buttonSizeCode = `<Button size="sm" variant="primary">Small</Button>
  <Button variant="primary">Default</Button>
  <Button size="lg" variant="primary">Large</Button>`
  
  const buttonIconCode = `<Button variant="primary" class="flex items-center gap-2">
    <PhPlus :size="16" />
    <span>Add Item</span>
  </Button>
  <Button variant="secondary" class="flex items-center gap-2">
    <PhTrash :size="16" />
    <span>Delete</span>
  </Button>`
  </script>