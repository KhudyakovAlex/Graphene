<script setup lang="ts">
type BaseInputSize = 'sm' | 'md' | 'lg'
type BaseInputType = 'text' | 'password' | 'search' | 'email' | 'number'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    helperText?: string
    placeholder?: string
    type?: BaseInputType
    size?: BaseInputSize
    disabled?: boolean
    readonly?: boolean
  }>(),
  {
    modelValue: '',
    label: '',
    helperText: '',
    placeholder: '',
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
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
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label
    class="g-base-input"
    :class="[
      `g-base-input--${props.size}`,
      {
        'g-base-input--filled': props.modelValue.length > 0,
        'g-base-input--disabled': props.disabled,
      },
    ]"
  >
    <span v-if="props.label" class="g-base-input__label">{{ props.label }}</span>

    <span class="g-base-input__field">
      <input
        class="g-base-input__control"
        :value="props.modelValue"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        @input="handleInput"
        @change="emit('change', $event)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      >

      <span v-if="$slots.trailing" class="g-base-input__trailing">
        <slot name="trailing" />
      </span>
    </span>

    <span v-if="props.helperText" class="g-base-input__helper">
      {{ props.helperText }}
    </span>
  </label>
</template>

<style scoped>
.g-base-input {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  color: var(--g-field-text);
}

.g-base-input__label {
  margin-bottom: var(--g-space-2);
  color: var(--g-field-label);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-regular);
}

.g-base-input__field {
  display: flex;
  align-items: center;
  width: 100%;
  border: 0;
  border-bottom: var(--g-border-width-sm) solid var(--g-field-border);
  border-radius: var(--g-radius-none);
  background: var(--g-field-bg);
}

.g-base-input__control {
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
}

.g-base-input__control::placeholder {
  color: var(--g-field-placeholder);
}

.g-base-input:hover:not(.g-base-input--disabled) .g-base-input__field {
  border-bottom-color: var(--g-field-border-hover);
  background: var(--g-field-bg-hover);
}

.g-base-input:focus-within:not(.g-base-input--disabled) .g-base-input__field {
  border-bottom-color: var(--g-field-border-focus);
}

.g-base-input__trailing {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: var(--g-field-text);
}

.g-base-input__control:disabled {
  cursor: not-allowed;
  opacity: 1;
  color: var(--g-field-placeholder);
}

.g-base-input--disabled .g-base-input__label,
.g-base-input--disabled .g-base-input__helper,
.g-base-input--disabled .g-base-input__trailing {
  color: var(--g-field-placeholder);
}

.g-base-input--disabled .g-base-input__field {
  background: var(--g-field-bg-disabled);
  cursor: not-allowed;
}

.g-base-input__helper {
  margin-top: var(--g-space-1);
  color: var(--g-field-helper);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-regular);
}

.g-base-input--sm .g-base-input__field {
  height: var(--g-size-control-sm);
  padding: 0 var(--g-space-2);
}

.g-base-input--sm .g-base-input__control {
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.g-base-input--md .g-base-input__field {
  height: var(--g-size-control-md);
  padding: 0 var(--g-space-2);
}

.g-base-input--md .g-base-input__control {
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-18);
}

.g-base-input--lg .g-base-input__field {
  height: var(--g-size-control-lg);
  padding: 0 var(--g-space-4);
}

.g-base-input--lg .g-base-input__control {
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}
</style>
