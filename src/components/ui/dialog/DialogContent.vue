<template>
  <Transition>
    <div v-if="dialogContext.isOpen" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      @click="dialogContext.close">
      <div
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-4 shadow-lg rounded-lg"
        @click.stop>
        <div class="flex flex-col space-y-2 text-center sm:text-left">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <p class="text-sm text-slate-700">
            <slot />
          </p>
        </div>
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 sm:gap-0">
          <Button v-if="showCancel" :variant="cancelVariant" @click="dialogContext.close">
            {{ cancelText }}
          </Button>
          <Button v-if="showAction" :variant="actionVariant" @click="handleAction">
            {{ actionText }}
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Button } from '../button'

interface DialogContext {
  isOpen: boolean
  open: () => void
  close: () => void
}

interface Props {
  title?: string
  showCancel?: boolean
  showAction?: boolean
  cancelText?: string
  actionText?: string
  cancelVariant?: 'default' | 'danger' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary'
  actionVariant?: 'default' | 'danger' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Dialog',
  showCancel: true,
  showAction: true,
  cancelText: 'Cancel',
  actionText: 'Continue',
  cancelVariant: 'outline',
  actionVariant: 'primary'
})

const emit = defineEmits<{
  action: []
}>()

const dialogContext = inject('dialog') as DialogContext

const handleAction = () => {
  emit('action')
  dialogContext.close()
}
</script>