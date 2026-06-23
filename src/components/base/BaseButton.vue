<script setup lang="ts">
type BaseButtonVariant = 'primary' | 'secondary'
type BaseButtonSize = 'sm' | 'md' | 'lg'
type BaseButtonType = 'button' | 'submit' | 'reset'

withDefaults(
  defineProps<{
    variant?: BaseButtonVariant
    size?: BaseButtonSize
    type?: BaseButtonType
    disabled?: boolean
  }>(),
  {
    variant: 'secondary',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="g-base-button"
    :class="[`g-base-button--${variant}`, `g-base-button--${size}`]"
    :type="type"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.g-base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--g-space-2);
  border: var(--g-border-width-sm) solid transparent;
  border-radius: var(--g-radius-none);
  font-family: var(--g-font-family-base);
  font-weight: var(--g-font-weight-medium);
  white-space: nowrap;
  cursor: pointer;
}

.g-base-button--sm {
  min-height: var(--g-size-control-sm);
  padding: 0 var(--g-space-3);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.g-base-button--md {
  min-height: var(--g-size-control-md);
  padding: 0 var(--g-space-4);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.g-base-button--lg {
  min-height: var(--g-size-control-lg);
  padding: 0 var(--g-space-5);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}

.g-base-button--primary {
  border-color: var(--g-action-primary-border);
  color: var(--g-action-primary-text);
  background: var(--g-action-primary-bg);
}

.g-base-button--primary:hover:not(:disabled) {
  background: var(--g-action-primary-bg-hover);
}

.g-base-button--secondary {
  border-color: var(--g-action-secondary-border);
  color: var(--g-action-secondary-text);
  background: var(--g-action-secondary-bg);
}

.g-base-button--secondary:hover:not(:disabled) {
  background: var(--g-action-secondary-bg-hover);
}

.g-base-button:disabled {
  cursor: not-allowed;
  opacity: var(--g-opacity-disabled);
}
</style>
