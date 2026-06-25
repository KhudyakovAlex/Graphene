<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'

import closeIcon from '../../assets/icons/close.svg?raw'

type DialogCloseReason = 'backdrop' | 'escape' | 'close-button'

let openDialogCount = 0
let previousBodyOverflow = ''
let dialogIdSequence = 0

const dialogId = ++dialogIdSequence
const titleId = `g-base-dialog-title-${dialogId}`

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    ariaLabel?: string
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showCloseButton?: boolean
  }>(),
  {
    modelValue: false,
    title: '',
    ariaLabel: '',
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: [reason: DialogCloseReason]
}>()

const slots = useSlots()
const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const bodyScrollLocked = ref(false)

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasHeader = computed(() => hasTitle.value || props.showCloseButton)
const hasFooter = computed(() => Boolean(slots.footer))
const dialogAriaLabel = computed(() => (
  hasTitle.value ? undefined : (props.ariaLabel || 'Dialog')
))

function lockBodyScroll() {
  if (typeof document === 'undefined' || bodyScrollLocked.value) {
    return
  }

  if (openDialogCount === 0) {
    previousBodyOverflow = document.body.style.overflow
  }

  openDialogCount += 1
  document.body.style.overflow = 'hidden'
  bodyScrollLocked.value = true
}

function unlockBodyScroll() {
  if (typeof document === 'undefined' || !bodyScrollLocked.value) {
    return
  }

  openDialogCount = Math.max(0, openDialogCount - 1)

  if (openDialogCount === 0) {
    document.body.style.overflow = previousBodyOverflow
  }

  bodyScrollLocked.value = false
}

function requestClose(reason: DialogCloseReason) {
  emit('update:modelValue', false)
  emit('close', reason)
}

function handleBackdropClick() {
  if (props.closeOnBackdrop) {
    requestClose('backdrop')
  }
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (!props.modelValue || !props.closeOnEscape || event.key !== 'Escape') {
    return
  }

  event.preventDefault()
  requestClose('escape')
}

watch(
  () => props.modelValue,
  async (isOpen, wasOpen) => {
    if (isOpen) {
      lockBodyScroll()

      await nextTick()

      if (props.showCloseButton) {
        closeButtonRef.value?.focus()
      } else {
        panelRef.value?.focus()
      }

      return
    }

    if (wasOpen) {
      unlockBodyScroll()
    }
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('keydown', handleDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleDocumentKeydown)
  unlockBodyScroll()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="g-base-dialog" @click.self="handleBackdropClick">
      <div class="g-base-dialog__backdrop" aria-hidden="true" />

      <section
        ref="panelRef"
        class="g-base-dialog__panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="hasTitle ? titleId : undefined"
        :aria-label="dialogAriaLabel"
        tabindex="-1"
      >
        <header v-if="hasHeader" class="g-base-dialog__header">
          <h2 v-if="hasTitle" :id="titleId" class="g-base-dialog__title">
            <slot name="title">{{ title }}</slot>
          </h2>

          <button
            v-if="showCloseButton"
            ref="closeButtonRef"
            class="g-base-dialog__close"
            type="button"
            :aria-label="hasTitle ? 'Close dialog' : 'Close'"
            @click="requestClose('close-button')"
          >
            <span class="g-base-dialog__close-icon" aria-hidden="true" v-html="closeIcon" />
          </button>
        </header>

        <div class="g-base-dialog__body">
          <slot />
        </div>

        <footer v-if="hasFooter" class="g-base-dialog__footer">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.g-base-dialog {
  position: fixed;
  inset: 0;
  z-index: var(--g-z-index-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--g-space-4);
}

.g-base-dialog__backdrop {
  position: absolute;
  inset: 0;
  background: var(--g-dialog-backdrop);
  opacity: var(--g-opacity-overlay);
}

.g-base-dialog__panel {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(452px, calc(100vw - var(--g-space-8)));
  max-height: calc(100vh - var(--g-space-8));
  flex-direction: column;
  gap: var(--g-space-6);
  padding: var(--g-space-4);
  border-radius: var(--g-radius-none);
  background: var(--g-dialog-surface);
  color: var(--g-dialog-text);
  outline: none;
}

.g-base-dialog__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--g-space-4);
}

.g-base-dialog__title {
  margin: 0;
  color: var(--g-dialog-title);
  font-size: var(--g-font-size-24);
  line-height: var(--g-line-height-32);
  font-weight: var(--g-font-weight-semibold);
}

.g-base-dialog__close {
  display: inline-flex;
  width: var(--g-size-control-md);
  height: var(--g-size-control-md);
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: var(--g-space-2);
  border: 0;
  border-radius: var(--g-radius-none);
  color: var(--g-dialog-close);
  background: transparent;
  cursor: pointer;
}

.g-base-dialog__close:hover {
  background: var(--g-dialog-close-hover-bg);
}

.g-base-dialog__close:focus-visible {
  outline: var(--g-border-width-md) solid var(--g-focus-ring);
  outline-offset: var(--g-space-1);
}

.g-base-dialog__close-icon {
  display: inline-flex;
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
}

.g-base-dialog__close-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.g-base-dialog__body {
  min-height: 0;
  overflow: auto;
  color: var(--g-dialog-text);
}

.g-base-dialog__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--g-space-4);
}

@media (max-width: 760px) {
  .g-base-dialog {
    padding: var(--g-space-2);
  }

  .g-base-dialog__panel {
    width: min(100%, calc(100vw - var(--g-space-4)));
    max-height: calc(100vh - var(--g-space-4));
  }
}
</style>
