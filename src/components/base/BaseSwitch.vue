<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

function handleChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked

  emit('update:modelValue', checked)
  emit('change', event)
}
</script>

<template>
  <label
    class="g-base-switch"
    :class="{
      'g-base-switch--checked': modelValue,
      'g-base-switch--disabled': disabled,
    }"
  >
    <input
      class="g-base-switch__control"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || undefined"
      @change="handleChange"
    >

    <span class="g-base-switch__track" aria-hidden="true">
      <span class="g-base-switch__thumb">
        <svg
          v-if="modelValue"
          class="g-base-switch__icon"
          viewBox="0 0 10 10"
          focusable="false"
        >
          <path d="M1.5 5.2 3.9 7.5 8.5 2.8" />
        </svg>
        <svg
          v-else
          class="g-base-switch__icon"
          viewBox="0 0 10 10"
          focusable="false"
        >
          <path d="M2 2 8 8" />
          <path d="M8 2 2 8" />
        </svg>
      </span>
    </span>
  </label>
</template>

<style scoped>
.g-base-switch {
  position: relative;
  display: inline-flex;
  width: calc(var(--g-switch-width) + var(--g-space-2) * 2);
  min-width: calc(var(--g-switch-width) + var(--g-space-2) * 2);
  height: var(--g-size-touch-min);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.g-base-switch__control {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.g-base-switch__track {
  position: relative;
  display: inline-flex;
  width: var(--g-switch-width);
  height: var(--g-switch-height);
  align-items: center;
  padding: 1px;
  border: var(--g-border-width-sm) solid var(--g-switch-track-border);
  border-radius: var(--g-radius-full);
  background: var(--g-switch-track);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.g-base-switch__thumb {
  display: inline-flex;
  width: var(--g-switch-thumb-size);
  height: var(--g-switch-thumb-size);
  align-items: center;
  justify-content: center;
  border-radius: var(--g-radius-full);
  color: var(--g-switch-icon);
  background: var(--g-switch-thumb);
  transform: translateX(0);
  transition:
    transform 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease;
}

.g-base-switch__icon {
  width: var(--g-switch-icon-size);
  height: var(--g-switch-icon-size);
}

.g-base-switch__icon path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: square;
}

.g-base-switch:hover:not(.g-base-switch--disabled):not(.g-base-switch--checked) .g-base-switch__track {
  border-color: var(--g-switch-track-border-hover);
  background: var(--g-switch-track-hover);
}

.g-base-switch--checked .g-base-switch__track {
  border-color: var(--g-switch-track-border-checked);
  background: var(--g-switch-track-checked);
}

.g-base-switch--checked .g-base-switch__thumb {
  color: var(--g-switch-icon-checked);
  background: var(--g-switch-thumb-checked);
  transform: translateX(calc(var(--g-switch-width) - var(--g-switch-thumb-size) - 4px));
}

.g-base-switch--checked:hover:not(.g-base-switch--disabled) .g-base-switch__track {
  border-color: var(--g-switch-track-border-checked-hover);
  background: var(--g-switch-track-checked-hover);
}

.g-base-switch__control:focus-visible + .g-base-switch__track {
  outline: var(--g-border-width-md) solid var(--g-focus-ring);
  outline-offset: var(--g-space-1);
}

.g-base-switch--disabled {
  cursor: not-allowed;
  opacity: var(--g-opacity-disabled);
}
</style>
