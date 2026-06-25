<script setup lang="ts">
import { ref } from 'vue'

import searchIcon from '../../../../src/assets/icons/search.svg?raw'
import {
  BaseButton,
  BaseCheckbox,
  BaseInput,
  BaseLink,
  Panel,
  BaseRadio,
  BaseSelect,
  BaseSlider,
  BaseSwitch,
  BaseTextarea,
} from '../../../../src/components'

const smInput = ref('')
const mdInput = ref('Filled value')
const invalidInput = ref('Invalid value')
const disabledInput = ref('Disabled value')
const searchInput = ref('')
const smSelect = ref('')
const mdSelect = ref('process')
const invalidSelect = ref('archive')
const disabledSelect = ref('disabled')
const clearableSelect = ref('draft')
const multipleSelect = ref(['draft', 'process'])
const textareaValue = ref('Multiline value')
const invalidTextarea = ref('Invalid multiline value')
const disabledTextarea = ref('Disabled multiline value')
const uncheckedCheckbox = ref(false)
const checkedCheckbox = ref(true)
const disabledCheckbox = ref(true)
const uncheckedSwitch = ref(false)
const checkedSwitch = ref(true)
const disabledSwitch = ref(true)
const selectedRadio = ref('checked')
const disabledRadio = ref('disabled-checked')
const sliderValue = ref(40)
const disabledSliderValue = ref(72)

const selectOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'process', label: 'In process' },
  { value: 'archive', label: 'Archived' },
  { value: 'disabled', label: 'Disabled option', disabled: true },
]
</script>

<template>
  <section class="base-page" aria-labelledby="baseTitle">
    <Panel as="header" class="base-page__header">
      <div>
        <p class="base-page__eyebrow">Components</p>
        <h1 id="baseTitle">Base</h1>
        <p class="base-page__description">
          Базовые контролы и поля ввода из <code>src/components/base/</code>. Эта страница
          повторяет структуру папки библиотеки и показывает живые примеры каждого компонента.
        </p>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="buttonTitle">
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
    </Panel>

    <Panel class="component-preview" aria-labelledby="linkTitle">
      <div>
        <h2 class="component-preview__title" id="linkTitle">BaseLink</h2>
      </div>

      <p class="text-preview">
        BaseLink can be used inline in text, for example to open the
        <BaseLink href="#assets/icons">icons catalog</BaseLink>.
      </p>

      <div class="button-row" aria-label="Состояния ссылки">
        <BaseLink href="#assets/icons">Open icons view</BaseLink>
        <BaseLink href="#components/feedback">Open feedback components</BaseLink>
        <BaseLink href="#assets/icons" disabled>Disabled link</BaseLink>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="checkboxTitle">
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
    </Panel>

    <Panel class="component-preview" aria-labelledby="switchTitle">
      <div>
        <h2 class="component-preview__title" id="switchTitle">BaseSwitch</h2>
      </div>

      <div class="checkbox-row" aria-label="Состояния переключателя">
        <span class="button-row__label">default</span>
        <BaseSwitch v-model="uncheckedSwitch" aria-label="Unchecked switch" />
        <span class="button-row__label">checked</span>
        <BaseSwitch v-model="checkedSwitch" aria-label="Checked switch" />
        <span class="button-row__label">disabled</span>
        <BaseSwitch v-model="disabledSwitch" aria-label="Disabled switch" disabled />
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="radioTitle">
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
    </Panel>

    <Panel class="component-preview" aria-labelledby="inputTitle">
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
    </Panel>

    <Panel class="component-preview" aria-labelledby="selectTitle">
      <div>
        <h2 class="component-preview__title" id="selectTitle">BaseSelect</h2>
      </div>

      <div class="input-grid">
        <BaseSelect
          v-model="smSelect"
          :options="selectOptions"
          size="sm"
          label="Label sm"
          placeholder="Placeholder text"
          helper-text="Native select with Graphene field tokens"
        />
        <BaseSelect
          v-model="mdSelect"
          :options="selectOptions"
          size="md"
          label="Label md"
          helper-text="Optional helper text"
        />
        <BaseSelect
          model-value="process"
          :options="selectOptions"
          size="lg"
          label="Label lg"
          helper-text="Optional helper text"
        />
        <BaseSelect
          v-model="invalidSelect"
          :options="selectOptions"
          label="Invalid"
          helper-text="Invalid helper text"
          invalid
        />
        <BaseSelect
          v-model="disabledSelect"
          :options="selectOptions"
          label="Disabled"
          helper-text="Optional helper text"
          disabled
        />
        <BaseSelect
          v-model="clearableSelect"
          :options="selectOptions"
          label="Clearable"
          helper-text="Clear button resets selected value"
          clearable
        />
        <BaseSelect
          :options="selectOptions"
          label="Loading"
          placeholder="Loading options"
          helper-text="Select is blocked while loading"
          loading
        />
        <BaseSelect
          v-model="multipleSelect"
          :options="selectOptions"
          label="Multiple"
          helper-text="Native multiple select"
          multiple
        />
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="sliderTitle">
      <div>
        <h2 class="component-preview__title" id="sliderTitle">BaseSlider</h2>
      </div>

      <div class="input-grid">
        <div class="slider-row">
          <span class="button-row__label">default</span>
          <BaseSlider v-model="sliderValue" aria-label="Default slider" />
        </div>
        <div class="slider-row">
          <span class="button-row__label">disabled</span>
          <BaseSlider
            v-model="disabledSliderValue"
            aria-label="Disabled slider"
            disabled
          />
        </div>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="textareaTitle">
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
    </Panel>
  </section>
</template>

<style scoped>
.base-page {
  display: grid;
  gap: var(--g-space-6);
}

.base-page__eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.base-page__description,
.text-preview {
  margin: 0;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-16);
  line-height: var(--g-line-height-24);
}

.component-preview {
  display: grid;
  gap: var(--g-space-4);
}

.component-preview__title,
h1 {
  margin: 0;
  font-weight: var(--g-font-weight-semibold);
}

h1 {
  font-size: var(--g-font-size-32);
  line-height: var(--g-line-height-40);
}

.component-preview__title {
  font-size: var(--g-font-size-24);
  line-height: var(--g-line-height-32);
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

.slider-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  gap: var(--g-space-3);
}

.input-icon {
  display: inline-flex;
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
  align-items: center;
  justify-content: center;
  color: var(--g-field-placeholder);
}

.input-icon :deep(svg) {
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
}
</style>
