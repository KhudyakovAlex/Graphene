<script setup lang="ts">
import { ref } from 'vue'

import {
  BaseButton,
  DataList,
  DataTable,
  BaseDialog,
  Panel,
  PropertyList,
} from '../../../../src/components'

const dialogOpen = ref(false)

const dataTableColumns = [
  { key: 'index', label: '№', width: '64px', muted: true },
  { key: 'date', label: 'Дата', width: '200px' },
  { key: 'type', label: 'Тип записи', width: '160px' },
  { key: 'event', label: 'Событие', width: '220px' },
  { key: 'value', label: 'Значение параметра', width: '220px' },
  { key: 'location', label: 'Локация', width: '160px' },
  { key: 'device', label: 'Устройство', width: '180px' },
] as const

const dataTableRows = [
  {
    index: '125',
    date: '06.02.26 15:40:25,333',
    type: 'Авария',
    event: 'Температура выше порога',
    value: '92 °C',
    location: 'Узел А-12',
    device: '1971052',
  },
  {
    index: '124',
    date: '06.02.26 15:37:11,104',
    type: 'Система',
    event: 'Потеряно соединение',
    value: 'MQTT timeout',
    location: 'Шлюз 3',
    device: 'mqtt.graphene.local',
  },
  {
    index: '123',
    date: '06.02.26 15:30:02,901',
    type: 'Действие',
    event: 'Запись добавлена',
    value: 'Оператор смены',
    location: 'АРМ диспетчера',
    device: 'manual-entry',
  },
  {
    index: '122',
    date: '06.02.26 15:20:54,442',
    type: 'Команда',
    event: 'Экспорт журнала',
    value: 'CSV',
    location: 'Узел А-12',
    device: 'workstation-02',
  },
]

const dataListItems = [
  {
    title: 'Температура выше порога',
    supportingText: 'Авария • Датчик температуры',
    meta: '06.02.26 15:40:25,333',
    trailing: 'Устройство 1971052',
  },
  {
    title: 'Потеряно соединение с устройством',
    supportingText: 'Система • Канал связи MQTT',
    meta: '06.02.26 15:37:11,104',
    trailing: 'mqtt.graphene.local',
  },
  {
    title: 'Запись добавлена оператором',
    supportingText: 'Действие пользователя • Конфигурация',
    meta: '06.02.26 15:30:02,901',
    trailing: 'Оператор смены',
  },
]

const summaryItems = [
  { label: 'Название', value: 'Датчик температуры' },
  { label: 'Код устройства', value: '1971052' },
  { label: 'Статус', value: 'Активен' },
  { label: 'Последнее обновление', value: '25.06.2026 11:47' },
]

const detailItems = [
  { label: 'Host', value: 'mqtt.graphene.local' },
  { label: 'Порт', value: '1883' },
  { label: 'Единица', value: '°C' },
  { label: 'Metric path', value: 'Indicator/Charts/Metric0/Temperature/Outdoor/MainSensor' },
  { label: 'Описание', value: 'Свойства записи удобно показывать в модальном окне, боковой панели или на странице деталей.' },
]
</script>

<template>
  <section class="data-page" aria-labelledby="dataTitle">
    <Panel as="header" class="data-page__header">
      <div>
        <p class="data-page__eyebrow">Components</p>
        <h1 id="dataTitle">Data</h1>
        <p class="data-page__description">
          Компоненты отображения данных из <code>src/components/data/</code>. Сейчас в разделе
          есть <code>DataList</code> и <code>PropertyList</code> для типовых data-сценариев.
        </p>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="dataTableTitle">
      <div>
        <h2 class="component-preview__title" id="dataTableTitle">DataTable</h2>
      </div>

      <p class="text-preview">
        Базовый табличный каркас для data-heavy сценариев. Текущий пример построен по мотивам
        экрана журнала событий и покрывает header, строки, dividers и hover.
      </p>

      <DataTable :columns="dataTableColumns" :rows="dataTableRows" />
    </Panel>

    <Panel class="component-preview" aria-labelledby="dataListTitle">
      <div>
        <h2 class="component-preview__title" id="dataListTitle">DataList</h2>
      </div>

      <p class="text-preview">
        DataList показывает плоский список записей: слева основное и supporting-содержание,
        справа метаданные строки.
      </p>

      <DataList :items="dataListItems" />
    </Panel>

    <Panel class="component-preview" aria-labelledby="propertyListTitle">
      <div>
        <h2 class="component-preview__title" id="propertyListTitle">PropertyList</h2>
      </div>

      <p class="text-preview">
        PropertyList показывает свойства объекта в виде списка <code>label/value</code> и не
        добавляет собственную surface-оболочку.
      </p>

      <PropertyList :items="summaryItems" />
    </Panel>

    <Panel class="component-preview" aria-labelledby="dialogUsageTitle">
      <div>
        <h2 class="component-preview__title" id="dialogUsageTitle">Dialog Usage</h2>
      </div>

      <p class="text-preview">
        Типовой сценарий для внутренних систем: клик по записи в таблице открывает
        <code>BaseDialog</code>, а внутри содержимое показывает <code>PropertyList</code>.
      </p>

      <div class="button-row">
        <BaseButton variant="primary" @click="dialogOpen = true">Открыть свойства записи</BaseButton>
      </div>

      <BaseDialog v-model="dialogOpen" title="Свойства записи">
        <PropertyList :items="detailItems" />

        <template #footer>
          <BaseButton @click="dialogOpen = false">Закрыть</BaseButton>
        </template>
      </BaseDialog>
    </Panel>
  </section>
</template>

<style scoped>
.data-page {
  display: grid;
  gap: var(--g-space-6);
}

.data-page__eyebrow {
  margin: 0 0 var(--g-space-3);
  color: var(--g-text-accent);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-semibold);
}

.data-page__description,
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
</style>
