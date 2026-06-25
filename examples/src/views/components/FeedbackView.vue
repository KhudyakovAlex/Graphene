<script setup lang="ts">
import { ref } from 'vue'

import {
  BaseButton,
  BaseDialog,
  BaseInput,
  ConfirmDialog,
} from '../../../../src/components'

const dialogOpen = ref(false)
const confirmDialogOpen = ref(false)
const confirmActionLabel = ref('Waiting for action')

const dialogName = ref('Датчик температуры')
const dialogCode = ref('1971052')
const dialogHost = ref('1971052')
const dialogPort = ref('1971052')
const dialogUnit = ref('°C')

function handleConfirm() {
  confirmActionLabel.value = 'Confirmed'
}

function handleCancel() {
  confirmActionLabel.value = 'Cancelled'
}
</script>

<template>
  <section class="feedback-page" aria-labelledby="feedbackTitle">
    <header class="panel feedback-page__header">
      <div>
        <p class="feedback-page__eyebrow">Components</p>
        <h1 id="feedbackTitle">Feedback</h1>
        <p class="feedback-page__description">
          Базовые модальные сценарии из <code>src/components/feedback/</code>. Раздел
          показывает универсальную оболочку диалога и готовый confirm-паттерн.
        </p>
      </div>
    </header>

    <section class="panel component-preview" aria-labelledby="dialogTitle">
      <div>
        <h2 class="component-preview__title" id="dialogTitle">BaseDialog</h2>
      </div>

      <p class="text-preview">
        BaseDialog is a generic shell for form dialogs, confirmations and other modal scenarios.
      </p>

      <div class="button-row">
        <BaseButton variant="primary" @click="dialogOpen = true">Open dialog</BaseButton>
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

    <section class="panel component-preview" aria-labelledby="confirmDialogTitle">
      <div>
        <h2 class="component-preview__title" id="confirmDialogTitle">ConfirmDialog</h2>
      </div>

      <p class="text-preview">
        ConfirmDialog is a ready-made confirmation pattern built on top of BaseDialog.
      </p>

      <div class="button-row">
        <BaseButton @click="confirmDialogOpen = true">Open confirm dialog</BaseButton>
        <span class="confirm-dialog-status">{{ confirmActionLabel }}</span>
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

.confirm-dialog-status {
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.dialog-demo {
  display: grid;
  gap: var(--g-space-6);
}

.dialog-demo__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--g-space-5);
}

.dialog-demo__section {
  display: grid;
  gap: var(--g-space-3);
}

.dialog-demo__section-header {
  display: flex;
  align-items: center;
  gap: var(--g-space-2);
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

.dialog-demo__mqtt-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 88px;
  gap: var(--g-space-5);
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
