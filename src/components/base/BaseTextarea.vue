<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    helperText?: string
    placeholder?: string
    rows?: number
    disabled?: boolean
    readonly?: boolean
    invalid?: boolean
  }>(),
  {
    modelValue: '',
    label: '',
    helperText: '',
    placeholder: '',
    rows: 4,
    disabled: false,
    readonly: false,
    invalid: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

function handleInput(event: Event) {
  emit('input', event)
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <label
    class="g-base-textarea"
    :class="{
      'g-base-textarea--filled': props.modelValue.length > 0,
      'g-base-textarea--disabled': props.disabled,
      'g-base-textarea--invalid': props.invalid,
    }"
  >
    <span v-if="props.label" class="g-base-textarea__label">{{ props.label }}</span>

    <textarea
      class="g-base-textarea__control"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :aria-invalid="props.invalid || undefined"
      @input="handleInput"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />

    <span v-if="props.helperText" class="g-base-textarea__helper">
      {{ props.helperText }}
    </span>
  </label>
</template>

<style scoped>
.g-base-textarea {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  color: var(--g-field-text);
}

.g-base-textarea__label {
  margin-bottom: var(--g-space-2);
  color: var(--g-field-label);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-field-label-weight);
}

.g-base-textarea__control {
  width: 100%;
  min-width: 0;
  padding: var(--g-space-2);
  border: 0;
  border-bottom: var(--g-border-width-sm) solid var(--g-field-border);
  border-radius: var(--g-radius-none);
  color: var(--g-field-text);
  background: var(--g-field-bg);
  font-family: var(--g-font-family-base);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
  font-weight: var(--g-font-weight-regular);
  outline: none;
  resize: vertical;
}

.g-base-textarea__control::placeholder {
  color: var(--g-field-placeholder);
}

.g-base-textarea:hover:not(.g-base-textarea--disabled) .g-base-textarea__control {
  border-bottom-color: var(--g-field-border-hover);
  background: var(--g-field-bg-hover);
}

.g-base-textarea:focus-within:not(.g-base-textarea--disabled) .g-base-textarea__control {
  border-bottom-color: var(--g-field-border-focus);
}

.g-base-textarea__control:disabled {
  cursor: not-allowed;
  opacity: 1;
  color: var(--g-field-placeholder);
}

.g-base-textarea--disabled .g-base-textarea__label,
.g-base-textarea--disabled .g-base-textarea__helper {
  opacity: var(--g-opacity-disabled);
  color: var(--g-field-placeholder);
}

.g-base-textarea--disabled .g-base-textarea__control {
  border-bottom-color: var(--g-field-border);
  opacity: var(--g-opacity-disabled);
  background: var(--g-field-bg);
  cursor: not-allowed;
  resize: none;
}

.g-base-textarea__helper {
  margin-top: var(--g-space-1);
  color: var(--g-field-helper);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-regular);
}

.g-base-textarea--invalid:not(.g-base-textarea--disabled) .g-base-textarea__control {
  border-bottom-color: var(--g-field-invalid);
  color: var(--g-field-invalid);
}

.g-base-textarea--invalid:hover:not(.g-base-textarea--disabled) .g-base-textarea__control,
.g-base-textarea--invalid:focus-within:not(.g-base-textarea--disabled) .g-base-textarea__control {
  border-bottom-color: var(--g-field-invalid);
}

.g-base-textarea--invalid:not(.g-base-textarea--disabled) .g-base-textarea__helper {
  color: var(--g-field-invalid);
}
</style>
