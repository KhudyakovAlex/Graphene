<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'

type DialogCloseReason = 'backdrop' | 'escape' | 'close-button'
type FocusableElement = HTMLElement

let openDialogCount = 0
let previousBodyOverflow = ''
let dialogIdSequence = 0
const openDialogStack: number[] = []
const dialogFocusRegistry = new Map<number, () => void>()

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
const stackRegistered = ref(false)
let restoreFocusTarget: HTMLElement | null = null

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasHeader = computed(() => hasTitle.value || props.showCloseButton)
const hasFooter = computed(() => Boolean(slots.footer))
const dialogAriaLabel = computed(() => (
  hasTitle.value ? undefined : (props.ariaLabel || 'Dialog')
))

function isTopmostDialog() {
  return openDialogStack[openDialogStack.length - 1] === dialogId
}

function getFocusableElements(): FocusableElement[] {
  if (!panelRef.value) {
    return []
  }

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  return Array
    .from(panelRef.value.querySelectorAll(focusableSelector))
    .filter((element): element is FocusableElement => (
      element instanceof HTMLElement
      && !element.hasAttribute('hidden')
      && element.tabIndex >= 0
    ))
}

function focusDialog() {
  if (props.showCloseButton && closeButtonRef.value) {
    closeButtonRef.value.focus()
    return
  }

  const [firstFocusableElement] = getFocusableElements()

  if (firstFocusableElement) {
    firstFocusableElement.focus()
    return
  }

  panelRef.value?.focus()
}

function focusTopmostDialog() {
  const topmostDialogId = openDialogStack[openDialogStack.length - 1]
  dialogFocusRegistry.get(topmostDialogId)?.()
}

function trapFocus(event: KeyboardEvent) {
  if (!panelRef.value) {
    return
  }

  const focusableElements = getFocusableElements()

  if (focusableElements.length === 0) {
    event.preventDefault()
    panelRef.value.focus()
    return
  }

  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement
  const focusInsideDialog = activeElement instanceof Node && panelRef.value.contains(activeElement)

  if (event.shiftKey) {
    if (!focusInsideDialog || activeElement === firstFocusableElement || activeElement === panelRef.value) {
      event.preventDefault()
      lastFocusableElement.focus()
    }

    return
  }

  if (!focusInsideDialog || activeElement === lastFocusableElement || activeElement === panelRef.value) {
    event.preventDefault()
    firstFocusableElement.focus()
  }
}

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

function registerDialog() {
  if (stackRegistered.value) {
    return
  }

  openDialogStack.push(dialogId)
  stackRegistered.value = true
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

function unregisterDialog() {
  if (!stackRegistered.value) {
    return
  }

  const dialogIndex = openDialogStack.lastIndexOf(dialogId)

  if (dialogIndex !== -1) {
    openDialogStack.splice(dialogIndex, 1)
  }

  stackRegistered.value = false
}

function restoreFocus() {
  const target = restoreFocusTarget
  restoreFocusTarget = null

  nextTick(() => {
    if (target?.isConnected) {
      target.focus()
      return
    }

    focusTopmostDialog()
  })
}

function activateDialog() {
  if (typeof document !== 'undefined' && !stackRegistered.value) {
    restoreFocusTarget = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
  }

  registerDialog()
  lockBodyScroll()
}

function deactivateDialog() {
  const wasTopmost = isTopmostDialog()

  unregisterDialog()
  unlockBodyScroll()

  if (wasTopmost) {
    restoreFocus()
  }
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
  if (!props.modelValue || !isTopmostDialog()) {
    return
  }

  if (event.key === 'Tab') {
    trapFocus(event)
    return
  }

  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault()
    requestClose('escape')
  }
}

watch(
  () => props.modelValue,
  async (isOpen, wasOpen) => {
    if (isOpen) {
      activateDialog()

      await nextTick()

      focusDialog()

      return
    }

    if (wasOpen) {
      deactivateDialog()
    }
  },
  { immediate: true },
)

onMounted(() => {
  dialogFocusRegistry.set(dialogId, focusDialog)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onUnmounted(() => {
  dialogFocusRegistry.delete(dialogId)
  document.removeEventListener('keydown', handleDocumentKeydown)
  deactivateDialog()
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
            <span class="g-base-dialog__close-icon" aria-hidden="true" />
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
  background-color: currentColor;
  mask: url('../../assets/icons/close.svg') center / contain no-repeat;
  -webkit-mask: url('../../assets/icons/close.svg') center / contain no-repeat;
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
