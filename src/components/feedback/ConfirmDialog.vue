<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue'
import BaseDialog from './BaseDialog.vue'

type DialogCloseReason = 'backdrop' | 'escape' | 'close-button'
type ConfirmDialogConfirmVariant = 'primary' | 'secondary'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    description?: string
    ariaLabel?: string
    confirmText?: string
    cancelText?: string
    confirmVariant?: ConfirmDialogConfirmVariant
    confirmDisabled?: boolean
    cancelDisabled?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showCloseButton?: boolean
  }>(),
  {
    modelValue: false,
    title: '',
    description: '',
    ariaLabel: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmVariant: 'primary',
    confirmDisabled: false,
    cancelDisabled: false,
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
  close: [reason: DialogCloseReason]
}>()

function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function handleClose(reason: DialogCloseReason) {
  emit('close', reason)
}
</script>

<template>
  <BaseDialog
    :model-value="modelValue"
    :title="title"
    :aria-label="ariaLabel"
    :close-on-backdrop="closeOnBackdrop"
    :close-on-escape="closeOnEscape"
    :show-close-button="showCloseButton"
    @update:model-value="emit('update:modelValue', $event)"
    @close="handleClose"
  >
    <div class="g-confirm-dialog">
      <p v-if="description" class="g-confirm-dialog__description">
        {{ description }}
      </p>

      <slot />
    </div>

    <template #footer>
      <slot name="footer">
        <BaseButton :disabled="cancelDisabled" @click="handleCancel">
          {{ cancelText }}
        </BaseButton>
        <BaseButton :variant="confirmVariant" :disabled="confirmDisabled" @click="handleConfirm">
          {{ confirmText }}
        </BaseButton>
      </slot>
    </template>
  </BaseDialog>
</template>

<style scoped>
.g-confirm-dialog {
  display: grid;
  gap: var(--g-space-4);
}

.g-confirm-dialog__description {
  margin: 0;
  color: var(--g-dialog-text);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
  font-weight: var(--g-font-weight-regular);
}
</style>
