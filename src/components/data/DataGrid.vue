<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots, watch } from 'vue'

import BaseButton from '../base/BaseButton.vue'
import BaseCheckbox from '../base/BaseCheckbox.vue'
import BaseInput from '../base/BaseInput.vue'

import DataTable from './DataTable.vue'

import type {
  DataGridColumn,
  DataGridColumnWidths,
  DataGridFilters,
  DataGridSort,
  DataTableCellSlotProps,
  DataTableHeaderSlotProps,
  DataTableLayout,
  DataTableRow,
} from './types'

interface DataGridToolbarSlotProps {
  columnWidths: DataGridColumnWidths
  columns: DataGridColumn[]
  filters: DataGridFilters
  hiddenColumnKeys: string[]
  resetGrid: () => void
  setColumnVisibility: (columnKey: string, visible: boolean) => void
  setFilter: (columnKey: string, value: string) => void
  setSort: (sort: DataGridSort | null) => void
  sort: DataGridSort | null
  toggleSort: (column: DataGridColumn) => void
  visibleColumns: DataGridColumn[]
}

interface ResizeSession {
  columnKey: string
  minWidth: number
  pointerId: number
  startWidth: number
  startX: number
}

const props = withDefaults(
  defineProps<{
    columns: DataGridColumn[]
    rows: DataTableRow[]
    layout?: DataTableLayout
    rowHover?: boolean
    sort?: DataGridSort | null
    filters?: DataGridFilters
    hiddenColumnKeys?: string[]
    columnWidths?: DataGridColumnWidths
  }>(),
  {
    layout: 'scroll',
    rowHover: true,
    sort: null,
    filters: () => ({}),
    hiddenColumnKeys: () => [],
    columnWidths: () => ({}),
  },
)

const emit = defineEmits<{
  'update:sort': [value: DataGridSort | null]
  'update:filters': [value: DataGridFilters]
  'update:hiddenColumnKeys': [value: string[]]
  'update:columnWidths': [value: DataGridColumnWidths]
}>()

const slots = useSlots()

const localSort = ref<DataGridSort | null>(props.sort)
const localFilters = ref<DataGridFilters>({ ...props.filters })
const localHiddenColumnKeys = ref<string[]>(getMergedHiddenColumnKeys(props.columns, props.hiddenColumnKeys))
const localColumnWidths = ref<DataGridColumnWidths>({ ...props.columnWidths })
const resizeSession = ref<ResizeSession | null>(null)

watch(
  () => props.sort,
  (value) => {
    localSort.value = value ?? null
  },
)

watch(
  () => props.filters,
  (value) => {
    localFilters.value = { ...value }
  },
  { deep: true },
)

watch(
  () => props.hiddenColumnKeys,
  (value) => {
    localHiddenColumnKeys.value = getMergedHiddenColumnKeys(props.columns, value)
  },
  { deep: true },
)

watch(
  () => props.columnWidths,
  (value) => {
    localColumnWidths.value = { ...value }
  },
  { deep: true },
)

watch(
  () => props.columns,
  (value) => {
    localHiddenColumnKeys.value = getMergedHiddenColumnKeys(value, localHiddenColumnKeys.value)
  },
  { deep: true },
)

const visibleColumns = computed<DataGridColumn[]>(() =>
  props.columns
    .filter((column) => !localHiddenColumnKeys.value.includes(column.key))
    .map((column) => ({
      ...column,
      width: localColumnWidths.value[column.key] ?? column.width,
    })),
)

const filterableColumns = computed(() => visibleColumns.value.filter((column) => column.filterable))
const hideableColumns = computed(() => props.columns.filter((column) => column.hideable))
const showToolbar = computed(
  () => Boolean(slots.toolbar) || filterableColumns.value.length > 0 || hideableColumns.value.length > 0,
)

const processedRows = computed(() => {
  const filteredRows = props.rows.filter((row) => matchesFilters(row, localFilters.value))
  return sortRows(filteredRows, localSort.value)
})

onBeforeUnmount(() => {
  stopResize()
})

function getMergedHiddenColumnKeys(columns: DataGridColumn[], hiddenColumnKeys: string[] = []) {
  const mergedKeys = new Set(hiddenColumnKeys)

  for (const column of columns) {
    if (column.defaultHidden) {
      mergedKeys.add(column.key)
    }
  }

  return [...mergedKeys]
}

function normalizeText(value: unknown) {
  return value == null ? '' : String(value).trim().toLowerCase()
}

function matchesFilters(row: DataTableRow, filters: DataGridFilters) {
  return Object.entries(filters).every(([columnKey, filterValue]) => {
    const normalizedFilter = normalizeText(filterValue)

    if (!normalizedFilter) {
      return true
    }

    return normalizeText(row[columnKey]).includes(normalizedFilter)
  })
}

function compareValues(left: unknown, right: unknown) {
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right
  }

  if (typeof left === 'boolean' && typeof right === 'boolean') {
    return Number(left) - Number(right)
  }

  return normalizeText(left).localeCompare(normalizeText(right), 'ru')
}

function sortRows(rows: DataTableRow[], sort: DataGridSort | null) {
  if (!sort) {
    return rows
  }

  const directionFactor = sort.direction === 'asc' ? 1 : -1

  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const result = compareValues(left.row[sort.key], right.row[sort.key])

      if (result === 0) {
        return left.index - right.index
      }

      return result * directionFactor
    })
    .map((entry) => entry.row)
}

function getSortDirection(columnKey: string) {
  return localSort.value?.key === columnKey ? localSort.value.direction : null
}

function getSortIndicator(columnKey: string) {
  const direction = getSortDirection(columnKey)

  if (direction === 'asc') {
    return '↑'
  }

  if (direction === 'desc') {
    return '↓'
  }

  return '↕'
}

function setSort(sort: DataGridSort | null) {
  localSort.value = sort
  emit('update:sort', sort)
}

function toggleSort(column: DataGridColumn) {
  if (!column.sortable) {
    return
  }

  const currentSort = localSort.value

  if (!currentSort || currentSort.key !== column.key) {
    setSort({ key: column.key, direction: 'asc' })
    return
  }

  if (currentSort.direction === 'asc') {
    setSort({ key: column.key, direction: 'desc' })
    return
  }

  setSort(null)
}

function setFilter(columnKey: string, value: string) {
  const nextFilters = { ...localFilters.value }

  if (value.trim()) {
    nextFilters[columnKey] = value
  } else {
    delete nextFilters[columnKey]
  }

  localFilters.value = nextFilters
  emit('update:filters', nextFilters)
}

function setHiddenColumnKeys(columnKeys: string[]) {
  localHiddenColumnKeys.value = columnKeys
  emit('update:hiddenColumnKeys', columnKeys)
}

function setColumnVisibility(columnKey: string, visible: boolean) {
  const nextKeys = new Set(localHiddenColumnKeys.value)

  if (visible) {
    nextKeys.delete(columnKey)
  } else {
    nextKeys.add(columnKey)
  }

  setHiddenColumnKeys([...nextKeys])
}

function setColumnWidths(columnWidths: DataGridColumnWidths) {
  localColumnWidths.value = columnWidths
  emit('update:columnWidths', columnWidths)
}

function clearFilters() {
  setFilterBatch({})
}

function setFilterBatch(filters: DataGridFilters) {
  localFilters.value = filters
  emit('update:filters', filters)
}

function resetGrid() {
  setSort(null)
  setFilterBatch({})
  setHiddenColumnKeys(getMergedHiddenColumnKeys(props.columns))
  setColumnWidths({})
}

function parsePixelWidth(value?: string) {
  if (!value) {
    return null
  }

  const normalizedValue = value.trim()

  if (!normalizedValue.endsWith('px')) {
    return null
  }

  const parsedValue = Number.parseFloat(normalizedValue)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

function getColumnMinWidth(column: DataGridColumn) {
  return (
    parsePixelWidth(column.minWidth) ??
    parsePixelWidth(column.width) ??
    parsePixelWidth(localColumnWidths.value[column.key]) ??
    96
  )
}

function getColumnWidth(column: DataGridColumn) {
  return (
    parsePixelWidth(localColumnWidths.value[column.key]) ??
    parsePixelWidth(column.width) ??
    getColumnMinWidth(column)
  )
}

function adjustColumnWidth(column: DataGridColumn, delta: number) {
  const nextWidth = Math.max(getColumnMinWidth(column), getColumnWidth(column) + delta)
  setColumnWidths({
    ...localColumnWidths.value,
    [column.key]: `${Math.round(nextWidth)}px`,
  })
}

function startResize(event: PointerEvent, column: DataGridColumn) {
  const headerCell = (event.currentTarget as HTMLElement).closest('th')

  if (!headerCell) {
    return
  }

  resizeSession.value = {
    columnKey: column.key,
    minWidth: getColumnMinWidth(column),
    pointerId: event.pointerId,
    startWidth: headerCell.getBoundingClientRect().width,
    startX: event.clientX,
  }

  window.addEventListener('pointermove', handleResizeMove)
  window.addEventListener('pointerup', stopResize)
  window.addEventListener('pointercancel', stopResize)

  event.preventDefault()
  event.stopPropagation()
}

function handleResizeMove(event: PointerEvent) {
  const session = resizeSession.value

  if (!session || event.pointerId !== session.pointerId) {
    return
  }

  const nextWidth = Math.max(session.minWidth, session.startWidth + event.clientX - session.startX)

  setColumnWidths({
    ...localColumnWidths.value,
    [session.columnKey]: `${Math.round(nextWidth)}px`,
  })
}

function stopResize(event?: PointerEvent) {
  if (event && resizeSession.value && event.pointerId !== resizeSession.value.pointerId) {
    return
  }

  resizeSession.value = null
  window.removeEventListener('pointermove', handleResizeMove)
  window.removeEventListener('pointerup', stopResize)
  window.removeEventListener('pointercancel', stopResize)
}

function handleResizeKeydown(event: KeyboardEvent, column: DataGridColumn) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    adjustColumnWidth(column, -16)
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    adjustColumnWidth(column, 16)
  }
}

function getToolbarSlotProps(): DataGridToolbarSlotProps {
  return {
    columnWidths: localColumnWidths.value,
    columns: props.columns,
    filters: localFilters.value,
    hiddenColumnKeys: localHiddenColumnKeys.value,
    resetGrid,
    setColumnVisibility,
    setFilter,
    setSort,
    sort: localSort.value,
    toggleSort,
    visibleColumns: visibleColumns.value,
  }
}

function getHeaderSlotProps(slotProps: DataTableHeaderSlotProps, column: DataGridColumn) {
  return {
    ...slotProps,
    sort: localSort.value,
    sortDirection: getSortDirection(column.key),
    toggleSort,
  }
}

function getCellSlotProps(slotProps: DataTableCellSlotProps) {
  return {
    ...slotProps,
    sort: localSort.value,
  }
}
</script>

<template>
  <section class="g-data-grid">
    <div v-if="showToolbar" class="g-data-grid__toolbar">
      <slot name="toolbar" v-bind="getToolbarSlotProps()">
        <div v-if="filterableColumns.length > 0" class="g-data-grid__filters">
          <BaseInput
            v-for="column in filterableColumns"
            :key="column.key"
            :label="column.label"
            :model-value="localFilters[column.key] ?? ''"
            placeholder="Фильтр"
            size="sm"
            @update:model-value="setFilter(column.key, $event)"
          />
        </div>

        <div v-if="hideableColumns.length > 0" class="g-data-grid__visibility">
          <p class="g-data-grid__toolbar-title">Колонки</p>

          <div class="g-data-grid__visibility-list">
            <div v-for="column in hideableColumns" :key="column.key" class="g-data-grid__visibility-item">
              <BaseCheckbox
                :model-value="!localHiddenColumnKeys.includes(column.key)"
                :aria-label="`Показать колонку ${column.label}`"
                @update:model-value="setColumnVisibility(column.key, $event)"
              />
              <span>{{ column.label }}</span>
            </div>
          </div>
        </div>

        <div class="g-data-grid__toolbar-actions">
          <BaseButton size="sm" @click="resetGrid">Сбросить вид</BaseButton>
          <BaseButton
            v-if="Object.keys(localFilters).length > 0"
            size="sm"
            variant="secondary"
            @click="clearFilters"
          >
            Очистить фильтры
          </BaseButton>
        </div>
      </slot>
    </div>

    <div v-if="visibleColumns.length === 0" class="g-data-grid__empty">
      Скрыты все колонки. Покажите хотя бы одну колонку в настройках вида.
    </div>

    <DataTable
      v-else
      :columns="visibleColumns"
      :layout="props.layout"
      :row-hover="props.rowHover"
      :rows="processedRows"
    >
      <template v-for="column in visibleColumns" #[`header-${column.key}`]="slotProps">
        <slot :name="`header-${column.key}`" v-bind="getHeaderSlotProps(slotProps, column)">
          <slot name="header" v-bind="getHeaderSlotProps(slotProps, column)">
            <div class="g-data-grid__head-content">
              <button
                v-if="column.sortable"
                type="button"
                class="g-data-grid__sort-button"
                :class="{ 'g-data-grid__sort-button--active': getSortDirection(column.key) !== null }"
                :aria-label="`Сменить сортировку по колонке ${column.label}`"
                @click="toggleSort(column)"
              >
                <span class="g-data-grid__head-label">{{ column.label }}</span>
                <span class="g-data-grid__sort-indicator" aria-hidden="true">
                  {{ getSortIndicator(column.key) }}
                </span>
              </button>

              <span v-else class="g-data-grid__head-label">
                {{ column.label }}
              </span>

              <span
                v-if="column.resizable"
                class="g-data-grid__resize-handle"
                aria-label="Изменить ширину колонки"
                role="separator"
                tabindex="0"
                @keydown="handleResizeKeydown($event, column)"
                @pointerdown="startResize($event, column)"
              />
            </div>
          </slot>
        </slot>
      </template>

      <template v-for="column in visibleColumns" #[`cell-${column.key}`]="slotProps">
        <slot :name="`cell-${column.key}`" v-bind="getCellSlotProps(slotProps)">
          <slot name="cell" v-bind="getCellSlotProps(slotProps)">
            <span class="g-data-table__cell-text">
              {{ slotProps.text }}
            </span>
          </slot>
        </slot>
      </template>
    </DataTable>
  </section>
</template>

<style scoped>
.g-data-grid {
  display: grid;
  gap: var(--g-space-4);
}

.g-data-grid__toolbar {
  display: grid;
  gap: var(--g-space-4);
}

.g-data-grid__filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--g-space-4);
}

.g-data-grid__visibility {
  display: grid;
  gap: var(--g-space-3);
}

.g-data-grid__toolbar-title {
  margin: 0;
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
  font-weight: var(--g-font-weight-medium);
}

.g-data-grid__visibility-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--g-space-4);
}

.g-data-grid__visibility-item {
  display: inline-flex;
  align-items: center;
  gap: var(--g-space-2);
  color: var(--g-text-secondary);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.g-data-grid__toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--g-space-3);
}

.g-data-table__cell-text {
  display: block;
}

.g-data-grid__empty {
  padding: var(--g-space-4);
  color: var(--g-text-secondary);
  background: var(--g-data-table-row-bg);
  font-size: var(--g-font-size-14);
  line-height: var(--g-line-height-20);
}

.g-data-grid__head-content {
  position: relative;
  display: flex;
  min-width: 0;
  align-items: stretch;
  gap: var(--g-space-2);
}

.g-data-grid__head-label {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.g-data-grid__sort-button {
  display: inline-flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--g-space-2);
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-align: inherit;
  cursor: pointer;
}

.g-data-grid__sort-button:focus-visible,
.g-data-grid__resize-handle:focus-visible {
  outline: var(--g-border-width-md) solid var(--g-focus-ring);
  outline-offset: var(--g-space-1);
}

.g-data-grid__sort-button--active {
  color: var(--g-data-table-cell-text);
}

.g-data-grid__sort-indicator {
  flex: 0 0 auto;
  color: var(--g-data-table-cell-text-muted);
}

.g-data-grid__resize-handle {
  flex: 0 0 auto;
  width: var(--g-space-3);
  cursor: col-resize;
  touch-action: none;
}

.g-data-grid__resize-handle::before {
  display: block;
  width: var(--g-border-width-sm);
  height: 100%;
  margin: 0 auto;
  background: var(--g-data-table-divider);
  content: '';
}

@media (max-width: 768px) {
  .g-data-grid__toolbar-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
