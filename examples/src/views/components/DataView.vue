<script setup lang="ts">
import { ref } from 'vue'

import {
  BaseButton,
  DataList,
  DataGrid,
  DataTable,
  BaseDialog,
  Panel,
  PropertyList,
} from '../../../../src/components'
import type {
  DataGridColumn,
  DataGridColumnWidths,
  DataGridFilters,
  DataGridSort,
  DataTableColumn,
  DataTableRow,
} from '../../../../src/components'

const dialogOpen = ref(false)

const dataTableColumns: DataTableColumn[] = [
  { key: 'index', label: '№', width: '72px', muted: true },
  { key: 'date', label: 'Дата', width: '168px' },
  { key: 'type', label: 'Тип записи', width: '140px' },
  { key: 'event', label: 'Событие' },
  { key: 'value', label: 'Значение', width: '112px', align: 'right' },
]

const dataTableRows: DataTableRow[] = [
  {
    index: '125',
    date: '06.02.26 15:40:25,333',
    type: 'Авария',
    event: 'Температура выше порога после переключения резервного контура охлаждения',
    value: '92 °C',
    textColor: 'var(--g-red-500)',
  },
  {
    index: '124',
    date: '06.02.26 15:37:11,104',
    type: 'Система',
    event: 'Потеряно соединение',
    value: 'MQTT timeout',
  },
  {
    kind: 'section',
    label: 'Группа: журнал команд',
  },
  {
    index: '123',
    date: '06.02.26 15:30:02,901',
    type: 'Действие',
    event: 'Запись добавлена',
    value: 'Оператор',
  },
  {
    index: '122',
    date: '06.02.26 15:20:54,442',
    type: 'Команда',
    event: 'Экспорт журнала',
    value: 'CSV',
    textColor: 'var(--g-ai-500)',
  },
  {
    index: '121',
    date: '06.02.26 15:12:43,882',
    type: 'Предупреждение',
    event: 'Температура выше уставки',
    value: '74 °C',
    textColor: 'var(--g-yellow-500)',
  },
  {
    kind: 'total',
    index: '',
    date: '',
    type: 'ИТОГО',
    event: '5 записей, 3 цветовые строки',
    value: '92 °C',
  },
]

const dataGridColumns: DataGridColumn[] = [
  {
    key: 'timestamp',
    label: 'Время',
    width: '176px',
    sortable: true,
    filterable: true,
    resizable: true,
  },
  {
    key: 'status',
    label: 'Статус',
    width: '120px',
    sortable: true,
    filterable: true,
    hideable: true,
    resizable: true,
  },
  {
    key: 'location',
    label: 'Локация',
    width: '160px',
    sortable: true,
    filterable: true,
    hideable: true,
    resizable: true,
  },
  {
    key: 'device',
    label: 'Устройство',
    width: '160px',
    sortable: true,
    filterable: true,
    hideable: true,
    resizable: true,
  },
  {
    key: 'description',
    label: 'Описание',
    minWidth: '280px',
    overflow: 'wrap',
    filterable: true,
    resizable: true,
  },
  {
    key: 'operator',
    label: 'Оператор',
    width: '160px',
    filterable: true,
    hideable: true,
    resizable: true,
  },
]

const dataGridRows = [
  {
    key: 'evt-1',
    timestamp: '2026-06-25 11:47:12',
    status: 'Критично',
    location: 'Узел А-12',
    device: '1971052',
    description: 'Температура держится выше допустимого порога более 15 минут, требуется проверка охлаждения.',
    operator: 'Смена А',
  },
  {
    key: 'evt-2',
    timestamp: '2026-06-25 11:42:08',
    status: 'Предупреждение',
    location: 'Шлюз 3',
    device: 'mqtt.graphene.local',
    description: 'Растет время ответа брокера, но связь еще активна и данные продолжают поступать.',
    operator: 'Смена Б',
  },
  {
    key: 'evt-3',
    timestamp: '2026-06-25 11:35:41',
    status: 'Норма',
    location: 'АРМ диспетчера',
    device: 'manual-entry',
    description: 'Оператор подтвердил запись и приложил развернутый комментарий к изменению конфигурации.',
    operator: 'Смена А',
  },
  {
    key: 'evt-4',
    timestamp: '2026-06-25 11:28:17',
    status: 'Критично',
    location: 'Шкаф КИП',
    device: 'cabinet-07',
    description: 'Сработала резервная защита привода после серии ошибок датчика положения.',
    operator: 'Смена В',
  },
]

const gridSort = ref<DataGridSort | null>({ key: 'timestamp', direction: 'desc' })
const gridFilters = ref<DataGridFilters>({})
const gridHiddenColumnKeys = ref<string[]>(['operator'])
const gridColumnWidths = ref<DataGridColumnWidths>({
  timestamp: '176px',
  status: '120px',
  location: '160px',
  device: '160px',
  description: '320px',
  operator: '160px',
})

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
          есть простой <code>DataTable</code>, интерактивный <code>DataGrid</code>,
          <code>DataList</code> и <code>PropertyList</code> для типовых data-сценариев.
        </p>
      </div>
    </Panel>

    <Panel class="component-preview" aria-labelledby="dataTableTitle">
      <div>
        <h2 class="component-preview__title" id="dataTableTitle">DataTable</h2>
      </div>

      <p class="text-preview">
        Базовый readonly-табличный каркас, который по умолчанию вписывается в доступную ширину.
        Пример показывает обычные строки, цветные строки, строку-раздел и строку
        <code>ИТОГО</code> в визуальном характере Pixso.
      </p>

      <DataTable :columns="dataTableColumns" :rows="dataTableRows" />
    </Panel>

    <Panel class="component-preview" aria-labelledby="dataGridTitle">
      <div>
        <h2 class="component-preview__title" id="dataGridTitle">DataGrid</h2>
      </div>

      <p class="text-preview">
        Интерактивная надстройка над <code>DataTable</code> для сценариев со сортировкой,
        фильтрами, скрытием колонок и изменением их ширины. Этот пример использует режим
        <code>fit</code>, а длинное описание переносится на новую строку через
        <code>overflow=&quot;wrap&quot;</code>.
      </p>

      <DataGrid
        v-model:sort="gridSort"
        v-model:filters="gridFilters"
        v-model:hidden-column-keys="gridHiddenColumnKeys"
        v-model:column-widths="gridColumnWidths"
        :columns="dataGridColumns"
        :rows="dataGridRows"
        layout="fit"
      />
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
