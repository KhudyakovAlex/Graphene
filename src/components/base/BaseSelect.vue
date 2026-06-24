<script setup lang="ts">
import { computed } from 'vue'

import caretDownIcon from '../../assets/icons/caret-down.svg?raw'
import closeIcon from '../../assets/icons/close.svg?raw'

type BaseSelectSize = 'sm' | 'md' | 'lg'
type BaseSelectValue = string | string[]

export interface BaseSelectOption {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: BaseSelectValue
    options?: BaseSelectOption[]
    label?: string
    helperText?: string
    placeholder?: string
    size?: BaseSelectSize
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
    loading?: boolean
    clearable?: boolean
    multiple?: boolean
  }>(),
  {
    modelValue: '',
    options: () => [],
    label: '',
    helperText: '',
    placeholder: '',
    size: 'md',
    disabled: false,
    readonly: false,
    invalid: false,
    loading: false,
    clearable: false,
    multiple: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: BaseSelectValue]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const hasValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0
  }

  return props.modelValue.length > 0
})

const normalizedValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  }

  return Array.isArray(props.modelValue) ? props.modelValue[0] ?? '' : props.modelValue
})

const selectValue = computed<BaseSelectValue>({
  get: () => normalizedValue.value,
  set: (value) => {
    if (props.readonly) {
      return
    }

    emit('update:modelValue', value)
  },
})

const canClear = computed(() => (
  props.clearable && hasValue.value && !props.disabled && !props.readonly && !props.loading
))

function handleChange(event: Event) {
  emit('change', event)
}

function clearSelection() {
  if (!canClear.value) {
    return
  }

  emit('update:modelValue', props.multiple ? [] : '')
  emit('clear')
}
</script>

<template>
  <label
    class="g-base-select"
    :class="[
      `g-base-select--${props.size}`,
      {
        'g-base-select--filled': hasValue,
        'g-base-select--disabled': props.disabled,
        'g-base-select--readonly': props.readonly,
        'g-base-select--invalid': props.invalid,
        'g-base-select--loading': props.loading,
        'g-base-select--multiple': props.multiple,
        'g-base-select--clearable': canClear,
      },
    ]"
  >
    <span v-if="props.label" class="g-base-select__label">{{ props.label }}</span>

    <span class="g-base-select__field">
      <select
        v-model="selectValue"
        class="g-base-select__control"
        :multiple="props.multiple"
        :disabled="props.disabled || props.loading"
        :aria-invalid="props.invalid || undefined"
        :aria-readonly="props.readonly || undefined"
        :aria-busy="props.loading || undefined"
        @change="handleChange"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      >
        <option
          v-if="props.placeholder && !props.multiple"
          value=""
          disabled
        >
          {{ props.placeholder }}
        </option>
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <button
        v-if="canClear"
        class="g-base-select__clear"
        type="button"
        aria-label="Clear selected value"
        @click.prevent="clearSelection"
      >
        <span aria-hidden="true" v-html="closeIcon" />
      </button>

      <span v-if="props.loading" class="g-base-select__loader" aria-hidden="true" />
      <span
        v-else-if="!props.multiple"
        class="g-base-select__indicator"
        aria-hidden="true"
        v-html="caretDownIcon"
      />
    </span>

    <span v-if="props.helperText" class="g-base-select__helper">
      {{ props.helperText }}
    </span>
  </label>
</template>

<style scoped>
.g-base-select {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  color: var(--g-field-text);
}

.g-base-select__label {
  margin-bottom: var(--g-space-2);
  color: var(--g-field-label);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-field-label-weight);
}

.g-base-select__field {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 0;
  border-bottom: var(--g-border-width-sm) solid var(--g-field-border);
  border-radius: var(--g-radius-none);
  background: var(--g-field-bg);
}

.g-base-select__control {
  min-width: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  color: var(--g-field-text);
  background: transparent;
  font-family: var(--g-font-family-base);
  font-weight: var(--g-font-weight-regular);
  outline: none;
  appearance: none;
  cursor: pointer;
}

.g-base-select__control:disabled {
  cursor: not-allowed;
  opacity: 1;
  color: var(--g-field-placeholder);
}

.g-base-select:not(.g-base-select--filled) .g-base-select__control {
  color: var(--g-field-placeholder);
}

.g-base-select__control option {
  color: var(--g-field-text);
  background-color: var(--g-field-bg);
}

.g-base-select:hover:not(.g-base-select--disabled):not(.g-base-select--loading):not(.g-base-select--invalid) .g-base-select__field {
  border-bottom-color: var(--g-field-border-hover);
  background: var(--g-field-bg-hover);
}

.g-base-select:hover:not(.g-base-select--disabled):not(.g-base-select--loading):not(.g-base-select--invalid).g-base-select--multiple .g-base-select__control,
.g-base-select:hover:not(.g-base-select--disabled):not(.g-base-select--loading):not(.g-base-select--invalid).g-base-select--multiple .g-base-select__control option {
  background-color: var(--g-field-bg-hover);
}

.g-base-select:focus-within:not(.g-base-select--disabled):not(.g-base-select--loading):not(.g-base-select--invalid) .g-base-select__field {
  border-bottom-color: var(--g-field-border-focus);
}

.g-base-select__indicator {
  position: absolute;
  top: 50%;
  right: var(--g-space-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
  color: var(--g-field-placeholder);
  transform: translateY(-50%);
  pointer-events: none;
}

.g-base-select__indicator :deep(svg) {
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
}

.g-base-select__clear {
  position: absolute;
  top: 50%;
  right: var(--g-space-6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
  padding: 0;
  border: 0;
  color: var(--g-field-placeholder);
  background: transparent;
  font: inherit;
  line-height: 0;
  cursor: pointer;
  transform: translateY(-50%);
}

.g-base-select__clear > span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.g-base-select__clear :deep(svg) {
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
}

.g-base-select__clear:hover {
  color: var(--g-field-text);
}

.g-base-select__loader {
  position: absolute;
  right: var(--g-space-2);
  bottom: 50%;
  width: var(--g-size-icon-sm);
  height: var(--g-size-icon-sm);
  margin-bottom: calc(var(--g-size-icon-sm) / -2);
  border: var(--g-border-width-sm) solid var(--g-field-placeholder);
  border-top-color: transparent;
  border-radius: 50%;
  pointer-events: none;
  animation: g-base-select-spin 0.8s linear infinite;
}

.g-base-select--disabled .g-base-select__label,
.g-base-select--disabled .g-base-select__helper {
  opacity: var(--g-opacity-disabled);
  color: var(--g-field-placeholder);
}

.g-base-select--disabled .g-base-select__field,
.g-base-select--loading .g-base-select__field {
  border-bottom-color: var(--g-field-border);
  opacity: var(--g-opacity-disabled);
  background: var(--g-field-bg);
  cursor: not-allowed;
}

.g-base-select--disabled.g-base-select--multiple .g-base-select__control,
.g-base-select--disabled.g-base-select--multiple .g-base-select__control option,
.g-base-select--loading.g-base-select--multiple .g-base-select__control,
.g-base-select--loading.g-base-select--multiple .g-base-select__control option {
  background-color: var(--g-field-bg);
}

.g-base-select__helper {
  margin-top: var(--g-space-1);
  color: var(--g-field-helper);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-regular);
}

.g-base-select--invalid:not(.g-base-select--disabled) .g-base-select__field {
  border-bottom-color: var(--g-field-invalid);
}

.g-base-select--invalid:hover:not(.g-base-select--disabled) .g-base-select__field,
.g-base-select--invalid:focus-within:not(.g-base-select--disabled) .g-base-select__field {
  border-bottom-color: var(--g-field-invalid);
}

.g-base-select--invalid.g-base-select--multiple .g-base-select__control,
.g-base-select--invalid.g-base-select--multiple .g-base-select__control option {
  background-color: var(--g-field-bg);
}

.g-base-select--invalid:not(.g-base-select--disabled) .g-base-select__control {
  color: var(--g-field-invalid);
}

.g-base-select--invalid:not(.g-base-select--disabled) .g-base-select__helper {
  color: var(--g-field-invalid);
}

.g-base-select--sm .g-base-select__field {
  height: var(--g-size-control-sm);
  padding: 0 var(--g-space-2);
}

.g-base-select--sm .g-base-select__control {
  padding-right: var(--g-space-6);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.g-base-select--md .g-base-select__field {
  height: var(--g-size-control-md);
  padding: 0 var(--g-space-2);
}

.g-base-select--md .g-base-select__control {
  padding-right: var(--g-space-6);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-18);
}

.g-base-select--lg .g-base-select__field {
  height: var(--g-size-control-lg);
  padding: 0 var(--g-space-4);
}

.g-base-select--lg .g-base-select__control {
  padding-right: var(--g-space-6);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}

.g-base-select--multiple .g-base-select__field {
  height: auto;
  min-height: var(--g-size-control-lg);
  padding: var(--g-space-1) var(--g-space-2);
}

.g-base-select--multiple .g-base-select__control {
  min-height: calc(var(--g-size-control-lg) * 2);
  padding-right: 0;
  background-color: var(--g-field-bg);
}

.g-base-select--clearable:not(.g-base-select--multiple) .g-base-select__control {
  padding-right: calc(var(--g-space-6) + var(--g-size-icon-md));
}

.g-base-select--readonly .g-base-select__control {
  cursor: default;
}

@keyframes g-base-select-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
