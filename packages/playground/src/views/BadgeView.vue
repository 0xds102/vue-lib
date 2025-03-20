<template>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Badge Component</h1>
      
      <!-- Basic Badges -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Basic Variants</h2>
        <div class="p-6 border border-border rounded-lg bg-base-200">
          <div class="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
        </div>
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <pre class="text-sm"><code>{{ badgeExampleCode }}</code></pre>
        </div>
      </section>
      
      <!-- Usage Examples -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Usage Examples</h2>
        <div class="p-6 border border-border rounded-lg bg-base-200">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <span>Status:</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div>
              <Button variant="primary" class="relative">
                Notifications
                <Badge class="absolute -top-2 -right-2" variant="error">5</Badge>
              </Button>
            </div>
          </div>
        </div>
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <pre class="text-sm"><code>{{ badgeUsageCode }}</code></pre>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { Badge } from '../components/ui/badge'
  import { Button } from '../components/ui/button'
  
  // Example code for display
  const badgeExampleCode = `<Badge>Default</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="warning">Warning</Badge>`
  
  const badgeUsageCode = `<div class="flex items-center gap-2">
    <span>Status:</span>
    <Badge variant="success">Active</Badge>
  </div>
  <div>
    <Button variant="primary" class="relative">
      Notifications
      <Badge class="absolute -top-2 -right-2" variant="error">5</Badge>
    </Button>
  </div>`
  </script>