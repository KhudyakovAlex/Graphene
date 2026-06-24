<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  input: [event: Event]
  change: [event: Event]
}>()

function handleInput(event: Event) {
  emit('input', event)
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}

function handleChange(event: Event) {
  emit('change', event)
}
</script>

<template>
  <span
    class="g-base-slider"
    :class="{ 'g-base-slider--disabled': props.disabled }"
  >
    <input
      class="g-base-slider__control"
      type="range"
      :value="props.modelValue"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="props.disabled"
      :aria-label="props.ariaLabel || undefined"
      @input="handleInput"
      @change="handleChange"
    >
  </span>
</template>

<style scoped>
.g-base-slider {
  --g-base-slider-thumb-color: var(--g-slider-thumb);
  --g-base-slider-track-pattern:
    repeating-linear-gradient(
      to right,
      var(--g-slider-track) 0 var(--g-slider-track-segment-width),
      transparent var(--g-slider-track-segment-width) calc(
        var(--g-slider-track-segment-width) + var(--g-slider-track-segment-gap)
      )
    );

  display: inline-flex;
  width: 100%;
  min-height: var(--g-slider-thumb-height);
  align-items: center;
}

.g-base-slider:hover:not(.g-base-slider--disabled) {
  --g-base-slider-thumb-color: var(--g-slider-thumb-hover);
}

.g-base-slider__control {
  width: 100%;
  height: var(--g-slider-thumb-height);
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
}

.g-base-slider__control:focus {
  outline: none;
}

.g-base-slider__control::-webkit-slider-runnable-track {
  height: var(--g-slider-track-segment-height);
  border-radius: var(--g-radius-none);
  background-color: transparent;
  background-image: var(--g-base-slider-track-pattern);
  background-repeat: repeat-x;
  background-size: auto 100%;
}

.g-base-slider__control::-webkit-slider-thumb {
  width: var(--g-slider-thumb-width);
  height: var(--g-slider-thumb-height);
  margin-top: calc((var(--g-slider-track-segment-height) - var(--g-slider-thumb-height)) / 2);
  border: 0;
  border-radius: var(--g-radius-none);
  background: var(--g-base-slider-thumb-color);
  appearance: none;
}

.g-base-slider__control::-moz-range-track {
  height: var(--g-slider-track-segment-height);
  border: 0;
  border-radius: var(--g-radius-none);
  background-color: transparent;
  background-image: var(--g-base-slider-track-pattern);
  background-repeat: repeat-x;
  background-size: auto 100%;
}

.g-base-slider__control::-moz-range-progress {
  height: var(--g-slider-track-segment-height);
  border-radius: var(--g-radius-none);
  background-color: transparent;
  background-image: var(--g-base-slider-track-pattern);
  background-repeat: repeat-x;
  background-size: auto 100%;
}

.g-base-slider__control::-moz-range-thumb {
  width: var(--g-slider-thumb-width);
  height: var(--g-slider-thumb-height);
  border: 0;
  border-radius: var(--g-radius-none);
  background: var(--g-base-slider-thumb-color);
}

.g-base-slider--disabled {
  opacity: var(--g-opacity-disabled);
}

.g-base-slider--disabled .g-base-slider__control {
  cursor: not-allowed;
}
</style>
