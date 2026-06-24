<script setup lang="ts">
import { computed } from 'vue'

type BaseRadioValue = string | number | boolean

const props = withDefaults(
  defineProps<{
    modelValue?: BaseRadioValue
    value?: BaseRadioValue
    name?: string
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    modelValue: '',
    value: 'on',
    name: '',
    disabled: false,
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: BaseRadioValue]
  change: [event: Event]
}>()

const checked = computed(() => props.modelValue === props.value)

function handleChange(event: Event) {
  emit('update:modelValue', props.value)
  emit('change', event)
}
</script>

<template>
  <label
    class="g-base-radio"
    :class="{ 'g-base-radio--disabled': props.disabled }"
  >
    <input
      class="g-base-radio__control"
      type="radio"
      :checked="checked"
      :value="String(props.value)"
      :name="props.name || undefined"
      :disabled="props.disabled"
      :aria-label="props.ariaLabel || undefined"
      @change="handleChange"
    >
    <span class="g-base-radio__box" aria-hidden="true">
      <span class="g-base-radio__mark" />
    </span>
  </label>
</template>

<style scoped>
.g-base-radio {
  position: relative;
  display: inline-flex;
  width: var(--g-size-touch-min);
  min-width: var(--g-size-touch-min);
  height: var(--g-size-touch-min);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.g-base-radio__control {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.g-base-radio__box {
  display: inline-flex;
  width: var(--g-radio-size);
  height: var(--g-radio-size);
  align-items: center;
  justify-content: center;
  border: var(--g-border-width-sm) solid var(--g-radio-border);
  border-radius: var(--g-radius-full);
  color: var(--g-radio-mark);
}

.g-base-radio:hover:not(.g-base-radio--disabled) .g-base-radio__box {
  border-color: var(--g-radio-border-hover);
}

.g-base-radio__mark {
  width: var(--g-radio-mark-size);
  height: var(--g-radio-mark-size);
  border-radius: var(--g-radius-full);
  background: currentColor;
  opacity: 0;
}

.g-base-radio__control:checked + .g-base-radio__box .g-base-radio__mark {
  opacity: 1;
}

.g-base-radio__control:focus-visible + .g-base-radio__box {
  outline: var(--g-border-width-md) solid var(--g-focus-ring);
  outline-offset: var(--g-space-1);
}

.g-base-radio--disabled {
  cursor: not-allowed;
  opacity: var(--g-opacity-disabled);
}
</style>
