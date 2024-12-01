<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { ref } from 'vue'
import { Input } from "@/components/ui/input"
import { Calendar } from '@/components/ui/calendar'
import { DatePicker } from '@/components/ui/datepicker'
import { Badge } from '@/components/ui/badge'

const date = ref<Date>()
const selectedDate = ref<Date>()
const value = ref('')
</script>

<template>
  <div class="flex flex-col min-h-screen flex items-center justify-center gap-4">
    <div class="w-1/3">
      <Dialog>
        <DialogTrigger>
          <Button variant="primary">Trigger</Button>
        </DialogTrigger>
        <DialogContent title="Test" cancelText="Cancel" actionText="Delete">
          Wagwan
        </DialogContent>
      </Dialog>
    </div>

    <DatePicker v-model="selectedDate" placeholder="Select date" class-name="your-custom-class" />
    <div class="w-1/3">
      <Input type="text" />
    </div>

    <div class="flex items-center gap-4">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>


    <div class="w-1/3">
      <Calendar />
    </div>

    <div class="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="danger">Danger</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="warning">Warning</Badge>
</div>
    

  </div>
</template>