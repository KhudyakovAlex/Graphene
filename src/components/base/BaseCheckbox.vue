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
    class="g-base-checkbox"
    :class="{ 'g-base-checkbox--disabled': disabled }"
  >
    <input
      class="g-base-checkbox__control"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || undefined"
      @change="handleChange"
    >
    <span class="g-base-checkbox__box" aria-hidden="true">
      <svg class="g-base-checkbox__mark" viewBox="0 0 10 10" focusable="false">
        <path d="M2 5.2 4.1 7.3 8 2.7" />
      </svg>
    </span>
  </label>
</template>

<style scoped>
.g-base-checkbox {
  position: relative;
  display: inline-flex;
  width: var(--g-size-touch-min);
  min-width: var(--g-size-touch-min);
  height: var(--g-size-touch-min);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.g-base-checkbox__control {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.g-base-checkbox__box {
  display: inline-flex;
  width: var(--g-checkbox-size);
  height: var(--g-checkbox-size);
  align-items: center;
  justify-content: center;
  border: var(--g-border-width-sm) solid var(--g-checkbox-border);
  border-radius: var(--g-radius-none);
  color: var(--g-checkbox-mark);
}

.g-base-checkbox:hover:not(.g-base-checkbox--disabled) .g-base-checkbox__box {
  border-color: var(--g-checkbox-border-hover);
}

.g-base-checkbox__mark {
  width: 10px;
  height: 10px;
  opacity: 0;
}

.g-base-checkbox__mark path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: square;
  stroke-linejoin: miter;
}

.g-base-checkbox__control:checked + .g-base-checkbox__box .g-base-checkbox__mark {
  opacity: 1;
}

.g-base-checkbox__control:focus-visible + .g-base-checkbox__box {
  outline: var(--g-border-width-md) solid var(--g-checkbox-border-hover);
  outline-offset: var(--g-space-1);
}

.g-base-checkbox--disabled {
  cursor: not-allowed;
  opacity: var(--g-opacity-disabled);
}
</style>
