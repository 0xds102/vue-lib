<template>
  <div class="container mx-auto py-8 px-4 flex flex-col items-center justify-center min-h-screen">
    <!-- Buttons -->
    <section class="max-w-4xl w-full">
      <h2 class="text-2xl font-bold mb-4">Buttons</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-medium mb-2">Variants</h3>
          <div class="flex flex-wrap gap-3">
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
      </div>
    </section>
    
    <!-- Badges -->
    <section class="max-w-4xl w-full mt-8">
      <h2 class="text-2xl font-bold mb-4">Badges</h2>
      <div class="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="warning">Warning</Badge>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
</script>