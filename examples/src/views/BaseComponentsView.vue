<script setup lang="ts">
import { ref } from 'vue'

import searchIcon from '../../../src/assets/icons/search.svg?raw'
import { BaseButton, BaseCheckbox, BaseInput, BaseRadio, BaseTextarea } from '../../../src/components'

const smInput = ref('')
const mdInput = ref('Filled value')
const invalidInput = ref('Invalid value')
const disabledInput = ref('Disabled value')
const searchInput = ref('')
const textareaValue = ref('Multiline value')
const invalidTextarea = ref('Invalid multiline value')
const disabledTextarea = ref('Disabled multiline value')
const uncheckedCheckbox = ref(false)
const checkedCheckbox = ref(true)
const disabledCheckbox = ref(true)
const selectedRadio = ref('checked')
const disabledRadio = ref('disabled-checked')
</script>

<template>
  <section class="panel component-preview" aria-labelledby="buttonTitle">
    <div>
      <h2 class="component-preview__title" id="buttonTitle">BaseButton</h2>
    </div>

    <div class="button-row" aria-label="Кнопки размера sm">
      <span class="button-row__label">sm</span>
      <BaseButton variant="primary" size="sm">Primary</BaseButton>
      <BaseButton variant="primary" size="sm" disabled>Primary disabled</BaseButton>
      <BaseButton size="sm">Secondary</BaseButton>
      <BaseButton size="sm" disabled>Secondary disabled</BaseButton>
    </div>

    <div class="button-row" aria-label="Кнопки размера md">
      <span class="button-row__label">md</span>
      <BaseButton variant="primary" size="md">Primary</BaseButton>
      <BaseButton variant="primary" size="md" disabled>Primary disabled</BaseButton>
      <BaseButton size="md">Secondary</BaseButton>
      <BaseButton size="md" disabled>Secondary disabled</BaseButton>
    </div>

    <div class="button-row" aria-label="Кнопки размера lg">
      <span class="button-row__label">lg</span>
      <BaseButton variant="primary" size="lg">Primary</BaseButton>
      <BaseButton variant="primary" size="lg" disabled>Primary disabled</BaseButton>
      <BaseButton size="lg">Secondary</BaseButton>
      <BaseButton size="lg" disabled>Secondary disabled</BaseButton>
    </div>
  </section>

  <section class="panel component-preview" aria-labelledby="checkboxTitle">
    <div>
      <h2 class="component-preview__title" id="checkboxTitle">BaseCheckbox</h2>
    </div>

    <div class="checkbox-row" aria-label="Состояния чекбокса">
      <span class="button-row__label">default</span>
      <BaseCheckbox v-model="uncheckedCheckbox" aria-label="Unchecked checkbox" />
      <span class="button-row__label">checked</span>
      <BaseCheckbox v-model="checkedCheckbox" aria-label="Checked checkbox" />
      <span class="button-row__label">disabled</span>
      <BaseCheckbox v-model="disabledCheckbox" aria-label="Disabled checkbox" disabled />
    </div>
  </section>

  <section class="panel component-preview" aria-labelledby="radioTitle">
    <div>
      <h2 class="component-preview__title" id="radioTitle">BaseRadio</h2>
    </div>

    <div class="checkbox-row" aria-label="Состояния радиокнопки">
      <span class="button-row__label">default</span>
      <BaseRadio
        v-model="selectedRadio"
        name="radioDefault"
        value="unchecked"
        aria-label="Unchecked radio"
      />
      <span class="button-row__label">checked</span>
      <BaseRadio
        v-model="selectedRadio"
        name="radioDefault"
        value="checked"
        aria-label="Checked radio"
      />
      <span class="button-row__label">disabled</span>
      <BaseRadio
        model-value="disabled-checked"
        name="radioDisabled"
        value="disabled-unchecked"
        aria-label="Disabled unchecked radio"
        disabled
      />
      <span class="button-row__label">disabled checked</span>
      <BaseRadio
        v-model="disabledRadio"
        name="radioDisabled"
        value="disabled-checked"
        aria-label="Disabled checked radio"
        disabled
      />
    </div>
  </section>

  <section class="panel component-preview" aria-labelledby="inputTitle">
    <div>
      <h2 class="component-preview__title" id="inputTitle">BaseInput</h2>
    </div>

    <div class="input-grid">
      <BaseInput
        v-model="smInput"
        size="sm"
        label="Label sm"
        placeholder="Placeholder text"
        helper-text="Optional helper text"
      />
      <BaseInput
        v-model="mdInput"
        size="md"
        label="Label md"
        helper-text="Optional helper text"
      />
      <BaseInput
        model-value="Focused state is shown when the field has focus"
        size="lg"
        label="Label lg"
        helper-text="Optional helper text"
      />
      <BaseInput
        v-model="invalidInput"
        size="md"
        label="Invalid"
        helper-text="Invalid helper text"
        invalid
      />
      <BaseInput
        v-model="disabledInput"
        size="md"
        label="Disabled"
        helper-text="Optional helper text"
        disabled
      />
      <BaseInput
        placeholder="Input without label"
        helper-text="Layout stays stable without label"
      />
      <BaseInput
        v-model="searchInput"
        type="search"
        label="Search"
        placeholder="Search by name"
        helper-text="Search icon is passed through trailing slot"
      >
        <template #trailing>
          <span class="input-icon" aria-hidden="true" v-html="searchIcon" />
        </template>
      </BaseInput>
    </div>
  </section>

  <section class="panel component-preview" aria-labelledby="textareaTitle">
    <div>
      <h2 class="component-preview__title" id="textareaTitle">BaseTextarea</h2>
    </div>

    <div class="input-grid">
      <BaseTextarea
        v-model="textareaValue"
        label="Textarea"
        placeholder="Enter long text"
        helper-text="Multiline input based on field tokens"
      />
      <BaseTextarea
        v-model="invalidTextarea"
        label="Invalid textarea"
        helper-text="Invalid helper text"
        invalid
      />
      <BaseTextarea
        v-model="disabledTextarea"
        label="Disabled textarea"
        helper-text="Optional helper text"
        disabled
      />
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: var(--g-space-8);
  border-radius: var(--g-radius-none);
  background: var(--g-bg-surface);
}

.eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.component-preview {
  display: grid;
  gap: var(--g-space-4);
}

.component-preview__title {
  margin: 0;
  font-size: var(--g-font-size-24);
  line-height: var(--g-line-height-32);
  font-weight: var(--g-font-weight-semibold);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--g-space-3);
}

.checkbox-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--g-space-2);
}

.button-row__label {
  min-width: 24px;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-12);
  line-height: var(--g-line-height-16);
  font-weight: var(--g-font-weight-medium);
  text-transform: uppercase;
}

.input-grid {
  display: grid;
  gap: var(--g-space-4);
  max-width: 560px;
}

.input-icon {
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--g-field-placeholder);
}

.input-icon :deep(svg) {
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
}

@media (max-width: 760px) {
  .panel {
    padding: var(--g-space-5);
  }

}
</style>
