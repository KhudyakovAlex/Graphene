BaseDialog is a generic shell for form dialogs, confirmations and other modal scenarios.<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import {
  BaseButton,
  BaseDialog,
  BaseInput,
  ConfirmDialog,
  FormDialog,
} from '../../../../src/components'

type DialogCloseReason = 'backdrop' | 'escape' | 'close-button'

const dialogOpen = ref(false)
const formDialogOpen = ref(false)
const confirmDialogOpen = ref(false)
const formDialogActionLabel = ref('Ожидание действия')
const confirmActionLabel = ref('Ожидание действия')
const formDialogPasswordVisible = ref(false)

const dialogName = ref('Датчик температуры')
const dialogCode = ref('1971052')
const dialogHost = ref('1971052')
const dialogPort = ref('1971052')
const dialogUnit = ref('°C')
const sensorDraft = reactive({
  name: 'Датчик температуры',
  deviceCode: '1971052',
  host: '1971052',
  port: '1971052',
  unit: '°C',
  login: '1971052',
  password: '',
  metricPath: 'Indicator/Charts/Metric0',
  projectCode: '3590',
  width: '3590',
  longitude: '3590',
})

const formDialogPasswordType = computed(() => (
  formDialogPasswordVisible.value ? 'text' : 'password'
))

function openFormDialog() {
  formDialogPasswordVisible.value = false
  formDialogOpen.value = true
}

function handleFormDialogSubmit() {
  formDialogActionLabel.value = 'Сохранено'
  formDialogPasswordVisible.value = false
  formDialogOpen.value = false
}

function handleFormDialogCancel() {
  formDialogActionLabel.value = 'Отменено'
  formDialogPasswordVisible.value = false
}

function handleFormDialogClose(reason: DialogCloseReason) {
  formDialogActionLabel.value = `Закрыто: ${reason}`
  formDialogPasswordVisible.value = false
}

function handleConfirm() {
  confirmActionLabel.value = 'Подтверждено'
}

function handleCancel() {
  confirmActionLabel.value = 'Отменено'
}
</script>

<template>
  <section class="feedback-page" aria-labelledby="feedbackTitle">
    <header class="panel feedback-page__header">
      <div>
        <p class="feedback-page__eyebrow">Компоненты</p>
        <h1 id="feedbackTitle">Обратная связь</h1>
        <p class="feedback-page__description">
          Базовые модальные сценарии из <code>src/components/feedback/</code>. Раздел
          показывает универсальную оболочку диалога и готовый сценарий подтверждения.
        </p>
      </div>
    </header>

    <section class="panel component-preview" aria-labelledby="dialogTitle">
      <div>
        <h2 class="component-preview__title" id="dialogTitle">BaseDialog</h2>
      </div>

      <p class="text-preview">
        BaseDialog - это универсальная оболочка для формовых диалогов, подтверждений и других
        модальных сценариев.
      </p>

      <div class="button-row">
        <BaseButton variant="primary" @click="dialogOpen = true">Открыть диалог</BaseButton>
      </div>

      <BaseDialog v-model="dialogOpen" title="Новый датчик">
        <div class="dialog-demo">
          <div class="dialog-demo__grid">
            <BaseInput
              v-model="dialogName"
              label="Название"
              helper-text="Название записи в системе"
            />
            <BaseInput
              v-model="dialogCode"
              label="Код устройства"
              helper-text="Внешний идентификатор"
            />
          </div>

          <div class="dialog-demo__section">
            <div class="dialog-demo__section-header">
              <span class="dialog-demo__section-title">MQTT</span>
              <span class="dialog-demo__divider" aria-hidden="true" />
            </div>

            <div class="dialog-demo__mqtt-grid">
              <BaseInput v-model="dialogHost" label="Host" />
              <BaseInput v-model="dialogPort" label="Порт" />
              <BaseInput v-model="dialogUnit" label="Единица" />
            </div>
          </div>
        </div>

        <template #footer>
          <BaseButton @click="dialogOpen = false">Отмена</BaseButton>
          <BaseButton variant="primary" @click="dialogOpen = false">Создать</BaseButton>
        </template>
      </BaseDialog>
    </section>

    <section class="panel component-preview" aria-labelledby="formDialogTitle">
      <div>
        <h2 class="component-preview__title" id="formDialogTitle">FormDialog</h2>
      </div>

      <p class="text-preview">
        FormDialog - это переиспользуемая оболочка для диалогов создания и редактирования,
        построенная поверх BaseDialog со стандартным footer для действий submit и cancel.
      </p>

      <div class="button-row">
        <BaseButton variant="primary" @click="openFormDialog">Открыть диалог редактирования</BaseButton>
        <span class="dialog-action-status">{{ formDialogActionLabel }}</span>
      </div>

      <FormDialog
        v-model="formDialogOpen"
        title="Новый датчик"
        submit-text="Создать"
        cancel-text="Отмена"
        @submit="handleFormDialogSubmit"
        @cancel="handleFormDialogCancel"
        @close="handleFormDialogClose"
      >
        <div class="dialog-demo">
          <div class="dialog-demo__grid">
            <BaseInput v-model="sensorDraft.name" label="Название" />
            <BaseInput v-model="sensorDraft.deviceCode" label="Код устройства" />
          </div>

          <div class="dialog-demo__section">
            <div class="dialog-demo__section-header">
              <span class="dialog-demo__section-title">MQTT</span>
              <span class="dialog-demo__divider" aria-hidden="true" />
            </div>

            <div class="dialog-demo__mqtt-grid">
              <BaseInput v-model="sensorDraft.host" label="Host" />
              <BaseInput v-model="sensorDraft.port" label="Порт" />
              <BaseInput v-model="sensorDraft.unit" label="Единица" />
            </div>

            <div class="dialog-demo__grid">
              <BaseInput v-model="sensorDraft.login" label="Логин" />
              <BaseInput
                v-model="sensorDraft.password"
                label="Пароль"
                helper-text="от 8 символов"
                :type="formDialogPasswordType"
              >
                <template #trailing>
                  <button
                    class="field-icon-button"
                    type="button"
                    :aria-label="formDialogPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
                    @click="formDialogPasswordVisible = !formDialogPasswordVisible"
                  >
                    <span
                      class="field-icon-button__icon"
                      :class="{ 'field-icon-button__icon--off': formDialogPasswordVisible }"
                      aria-hidden="true"
                    />
                  </button>
                </template>
              </BaseInput>
            </div>

            <span class="dialog-demo__divider dialog-demo__divider--full" aria-hidden="true" />
          </div>

          <div class="dialog-demo__grid">
            <BaseInput v-model="sensorDraft.metricPath" label="Metric path" />
            <BaseInput v-model="sensorDraft.projectCode" label="Код проекта" />
          </div>

          <div class="dialog-demo__grid">
            <BaseInput v-model="sensorDraft.width" label="Ширина" />
            <BaseInput v-model="sensorDraft.longitude" label="Долгота" />
          </div>
        </div>
      </FormDialog>
    </section>

    <section class="panel component-preview" aria-labelledby="confirmDialogTitle">
      <div>
        <h2 class="component-preview__title" id="confirmDialogTitle">ConfirmDialog</h2>
      </div>

      <p class="text-preview">
        ConfirmDialog - это готовый сценарий подтверждения, построенный поверх BaseDialog.
      </p>

      <div class="button-row">
        <BaseButton @click="confirmDialogOpen = true">Открыть диалог подтверждения</BaseButton>
        <span class="dialog-action-status">{{ confirmActionLabel }}</span>
      </div>

      <ConfirmDialog
        v-model="confirmDialogOpen"
        title="Удалить запись"
        description="Действие нельзя отменить. Запись будет удалена из списка и из связанных представлений."
        confirm-text="Удалить"
        cancel-text="Отмена"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </section>
  </section>
</template>

<style scoped>
.feedback-page {
  display: grid;
  gap: var(--g-space-6);
}

.panel {
  padding: var(--g-space-8);
  border-radius: var(--g-radius-none);
  background: var(--g-bg-surface);
}

.feedback-page__eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.feedback-page__description,
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

.dialog-action-status {
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.dialog-demo {
  display: grid;
  gap: var(--g-form-dialog-gap);
}

.dialog-demo__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--g-form-grid-column-gap);
  row-gap: var(--g-form-grid-row-gap);
}

.dialog-demo__section {
  display: grid;
  gap: var(--g-form-dialog-section-gap);
}

.dialog-demo__section-header {
  display: flex;
  align-items: center;
  gap: var(--g-form-dialog-section-header-gap);
}

.dialog-demo__section-title {
  color: var(--g-dialog-section-title);
  font-size: var(--g-font-size-18);
  line-height: var(--g-line-height-28);
  font-weight: var(--g-font-weight-semibold);
}

.dialog-demo__divider {
  display: block;
  width: 100%;
  height: var(--g-border-width-sm);
  background: var(--g-dialog-divider);
}

.dialog-demo__divider--full {
  margin-top: var(--g-space-1);
}

.dialog-demo__mqtt-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 88px;
  column-gap: var(--g-form-grid-column-gap);
  row-gap: var(--g-form-grid-row-gap);
}

.field-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
  padding: 0;
  border: 0;
  color: var(--g-field-placeholder);
  background: transparent;
  line-height: 0;
  cursor: pointer;
}

.field-icon-button:hover {
  color: var(--g-field-text);
}

.field-icon-button__icon {
  display: block;
  width: var(--g-size-icon-md);
  height: var(--g-size-icon-md);
  background-color: currentColor;
  mask: url('../../../../src/assets/icons/view.svg') center / contain no-repeat;
  -webkit-mask: url('../../../../src/assets/icons/view.svg') center / contain no-repeat;
}

.field-icon-button__icon--off {
  mask-image: url('../../../../src/assets/icons/view-off.svg');
  -webkit-mask-image: url('../../../../src/assets/icons/view-off.svg');
}

@media (max-width: 760px) {
  .panel {
    padding: var(--g-space-5);
  }

  .dialog-demo__mqtt-grid,
  .dialog-demo__grid {
    grid-template-columns: 1fr;
  }
}
</style>
