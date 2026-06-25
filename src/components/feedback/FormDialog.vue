<script setup lang="ts">
import { computed } from 'vue'

import BaseButton from '../base/BaseButton.vue'
import BaseDialog from './BaseDialog.vue'

type DialogCloseReason = 'backdrop' | 'escape' | 'close-button'

let formDialogIdSequence = 0

const formDialogId = ++formDialogIdSequence

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    description?: string
    ariaLabel?: string
    submitText?: string
    cancelText?: string
    submitDisabled?: boolean
    cancelDisabled?: boolean
    submitting?: boolean
    formId?: string
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showCloseButton?: boolean
  }>(),
  {
    modelValue: false,
    title: '',
    description: '',
    ariaLabel: '',
    submitText: 'Save',
    cancelText: 'Cancel',
    submitDisabled: false,
    cancelDisabled: false,
    submitting: false,
    formId: '',
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [event: SubmitEvent]
  cancel: []
  close: [reason: DialogCloseReason]
}>()

const resolvedFormId = computed(() => (
  props.formId || `g-form-dialog-form-${formDialogId}`
))
const resolvedSubmitDisabled = computed(() => props.submitDisabled || props.submitting)
const resolvedCancelDisabled = computed(() => props.cancelDisabled || props.submitting)

function handleCancel() {
  if (resolvedCancelDisabled.value) {
    return
  }

  emit('cancel')
  emit('update:modelValue', false)
}

function handleSubmit(event: SubmitEvent) {
  if (resolvedSubmitDisabled.value) {
    return
  }

  emit('submit', event)
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
    <form
      :id="resolvedFormId"
      class="g-form-dialog"
      :aria-busy="submitting || undefined"
      @submit.prevent="handleSubmit"
    >
      <p v-if="description" class="g-form-dialog__description">
        {{ description }}
      </p>

      <div class="g-form-dialog__body">
        <slot />
      </div>
    </form>

    <template #footer>
      <slot name="footer">
        <BaseButton :disabled="resolvedCancelDisabled" @click="handleCancel">
          {{ cancelText }}
        </BaseButton>
        <BaseButton
          variant="primary"
          type="submit"
          :form="resolvedFormId"
          :disabled="resolvedSubmitDisabled"
        >
          {{ submitText }}
        </BaseButton>
      </slot>
    </template>
  </BaseDialog>
</template>

<style scoped>
.g-form-dialog {
  display: grid;
  gap: var(--g-form-dialog-gap);
}

.g-form-dialog__description {
  margin: 0;
  color: var(--g-dialog-text);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
  font-weight: var(--g-font-weight-regular);
}

.g-form-dialog__body {
  display: grid;
  gap: var(--g-form-dialog-body-gap);
}
</style>
