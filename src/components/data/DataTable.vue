<script setup lang="ts">
type DataTableColumnAlign = 'left' | 'center' | 'right'

interface DataTableColumn {
  key: string
  label: string
  width?: string
  align?: DataTableColumnAlign
  muted?: boolean
}

interface DataTableRow {
  key?: string
  [key: string]: string | number | undefined
}

const props = defineProps<{
  columns: DataTableColumn[]
  rows: DataTableRow[]
}>()

function getRowKey(row: DataTableRow, index: number) {
  return row.key ?? `row-${index}`
}

function getCellValue(row: DataTableRow, columnKey: string) {
  const value = row[columnKey]
  return value == null ? '' : String(value)
}

function getColumnAlign(column: DataTableColumn) {
  return column.align ?? 'left'
}
</script>

<template>
  <div class="g-data-table">
    <table class="g-data-table__table">
      <colgroup>
        <col
          v-for="column in props.columns"
          :key="column.key"
          :style="column.width ? { width: column.width } : undefined"
        >
      </colgroup>

      <thead class="g-data-table__head">
        <tr class="g-data-table__head-row">
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="g-data-table__head-cell"
            :class="[
              `g-data-table__head-cell--${getColumnAlign(column)}`,
              { 'g-data-table__head-cell--muted': column.muted },
            ]"
            scope="col"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody class="g-data-table__body">
        <tr v-for="(row, rowIndex) in props.rows" :key="getRowKey(row, rowIndex)" class="g-data-table__row">
          <td
            v-for="column in props.columns"
            :key="column.key"
            class="g-data-table__cell"
            :class="[
              `g-data-table__cell--${getColumnAlign(column)}`,
              { 'g-data-table__cell--muted': column.muted },
            ]"
          >
            {{ getCellValue(row, column.key) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.g-data-table {
  overflow-x: auto;
  border-radius: var(--g-data-table-radius);
  background: var(--g-data-table-row-bg);
}

.g-data-table__table {
  width: 100%;
  min-width: 720px;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.g-data-table__head-cell,
.g-data-table__cell {
  overflow: hidden;
  padding: var(--g-data-table-cell-padding-y) var(--g-data-table-cell-padding-x);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.g-data-table__head-cell {
  height: var(--g-data-table-header-height);
  color: var(--g-data-table-header-text);
  background: var(--g-data-table-header-bg);
  border-bottom: var(--g-data-table-divider-width) solid var(--g-data-table-divider);
  font-size: var(--g-data-table-header-size);
  line-height: var(--g-data-table-header-line-height);
  font-weight: var(--g-data-table-header-weight);
}

.g-data-table__head-cell + .g-data-table__head-cell,
.g-data-table__cell + .g-data-table__cell {
  border-left: var(--g-data-table-divider-width) solid var(--g-data-table-divider);
}

.g-data-table__row {
  background: var(--g-data-table-row-bg);
}

.g-data-table__row:hover {
  background: var(--g-data-table-row-hover-bg);
}

.g-data-table__row:not(:last-child) .g-data-table__cell {
  border-bottom: var(--g-data-table-divider-width) solid var(--g-data-table-divider);
}

.g-data-table__cell {
  height: var(--g-data-table-row-height);
  color: var(--g-data-table-cell-text);
  font-size: var(--g-data-table-cell-size);
  line-height: var(--g-data-table-cell-line-height);
  font-weight: var(--g-data-table-cell-weight);
}

.g-data-table__head-cell--muted,
.g-data-table__cell--muted {
  color: var(--g-data-table-cell-text-muted);
}

.g-data-table__head-cell--left,
.g-data-table__cell--left {
  text-align: left;
}

.g-data-table__head-cell--center,
.g-data-table__cell--center {
  text-align: center;
}

.g-data-table__head-cell--right,
.g-data-table__cell--right {
  text-align: right;
}
</style>
