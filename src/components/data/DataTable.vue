<script setup lang="ts">
import type { CSSProperties } from 'vue'

import type {
  DataTableCellSlotProps,
  DataTableColumn,
  DataTableColumnOverflow,
  DataTableHeaderSlotProps,
  DataTableLayout,
  DataTableRow,
  DataTableRowKind,
} from './types'

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn[]
    rows: DataTableRow[]
    layout?: DataTableLayout
    rowHover?: boolean
  }>(),
  {
    layout: 'fit',
    rowHover: true,
  },
)

function getRowKey(row: DataTableRow, index: number) {
  return row.key ?? `${getRowKind(row)}-row-${index}`
}

function getCellValue(row: DataTableRow, columnKey: string) {
  return row[columnKey]
}

function getCellText(value: unknown) {
  return value == null ? '' : String(value)
}

function getRowKind(row: DataTableRow): DataTableRowKind {
  return row.kind ?? 'default'
}

function isSectionRow(row: DataTableRow) {
  return getRowKind(row) === 'section'
}

function hasRowTextColor(row: DataTableRow) {
  return typeof row.textColor === 'string' && row.textColor.trim().length > 0
}

function getSectionLabel(row: DataTableRow) {
  return typeof row.label === 'string' ? row.label : ''
}

function getRowStyle(row: DataTableRow): CSSProperties | undefined {
  if (!hasRowTextColor(row)) {
    return undefined
  }

  return {
    '--g-data-table-row-accent-text': row.textColor,
  } as CSSProperties
}

function getSectionColSpan(columns: DataTableColumn[]) {
  return Math.max(columns.length, 1)
}

function getColumnAlign(column: DataTableColumn) {
  return column.align ?? 'left'
}

function getColumnOverflow(column: DataTableColumn): DataTableColumnOverflow {
  return column.overflow ?? 'ellipsis'
}

function getColumnStyle(column: DataTableColumn) {
  if (!column.width && !column.minWidth) {
    return undefined
  }

  return {
    width: column.width,
    minWidth: column.minWidth ?? column.width,
  }
}

function getHeaderSlotProps(column: DataTableColumn, columnIndex: number): DataTableHeaderSlotProps {
  return {
    column,
    columnIndex,
  }
}

function getCellSlotProps(
  row: DataTableRow,
  column: DataTableColumn,
  rowIndex: number,
  columnIndex: number,
): DataTableCellSlotProps {
  const value = getCellValue(row, column.key)

  return {
    column,
    columnIndex,
    row,
    rowIndex,
    value,
    text: getCellText(value),
  }
}
</script>

<template>
  <div
    class="g-data-table"
    :class="[
      `g-data-table--layout-${props.layout}`,
      { 'g-data-table--row-hover': props.rowHover },
    ]"
  >
    <table class="g-data-table__table">
      <colgroup>
        <col
          v-for="column in props.columns"
          :key="column.key"
          :style="getColumnStyle(column)"
        >
      </colgroup>

      <thead class="g-data-table__head">
        <tr class="g-data-table__head-row">
          <th
            v-for="(column, columnIndex) in props.columns"
            :key="column.key"
            class="g-data-table__head-cell"
            :class="[
              `g-data-table__head-cell--${getColumnAlign(column)}`,
              `g-data-table__head-cell--overflow-${getColumnOverflow(column)}`,
              { 'g-data-table__head-cell--muted': column.muted },
            ]"
            scope="col"
            :title="getColumnOverflow(column) === 'ellipsis' ? column.label : undefined"
          >
            <slot :name="`header-${column.key}`" v-bind="getHeaderSlotProps(column, columnIndex)">
              <slot name="header" v-bind="getHeaderSlotProps(column, columnIndex)">
                <span class="g-data-table__head-label">{{ column.label }}</span>
              </slot>
            </slot>
          </th>
        </tr>
      </thead>

      <tbody class="g-data-table__body">
        <template v-for="(row, rowIndex) in props.rows" :key="getRowKey(row, rowIndex)">
          <tr
            v-if="isSectionRow(row)"
            class="g-data-table__row g-data-table__row--section"
            :class="{ 'g-data-table__row--tinted': hasRowTextColor(row) }"
            :style="getRowStyle(row)"
          >
            <td class="g-data-table__section-cell" :colspan="getSectionColSpan(props.columns)">
              <slot name="section" :row="row" :row-index="rowIndex" :label="getSectionLabel(row)">
                <span class="g-data-table__section-text">
                  {{ getSectionLabel(row) }}
                </span>
              </slot>
            </td>
          </tr>

          <tr
            v-else
            class="g-data-table__row"
            :class="[
              `g-data-table__row--${getRowKind(row)}`,
              { 'g-data-table__row--tinted': hasRowTextColor(row) },
            ]"
            :style="getRowStyle(row)"
          >
            <td
              v-for="(column, columnIndex) in props.columns"
              :key="column.key"
              class="g-data-table__cell"
              :class="[
                `g-data-table__cell--${getColumnAlign(column)}`,
                `g-data-table__cell--overflow-${getColumnOverflow(column)}`,
                { 'g-data-table__cell--muted': column.muted },
              ]"
              :title="
                getColumnOverflow(column) === 'ellipsis'
                  ? getCellText(getCellValue(row, column.key)) || undefined
                  : undefined
              "
            >
              <slot :name="`cell-${column.key}`" v-bind="getCellSlotProps(row, column, rowIndex, columnIndex)">
                <slot name="cell" v-bind="getCellSlotProps(row, column, rowIndex, columnIndex)">
                  <span class="g-data-table__cell-text">
                    {{ getCellText(getCellValue(row, column.key)) }}
                  </span>
                </slot>
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.g-data-table {
  min-width: 0;
  overflow-x: hidden;
  border-radius: var(--g-data-table-radius);
  background: var(--g-data-table-row-bg);
}

.g-data-table--layout-scroll {
  overflow-x: auto;
}

.g-data-table__table {
  width: 100%;
  min-width: 0;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.g-data-table--layout-scroll .g-data-table__table {
  width: max-content;
  min-width: 100%;
  table-layout: auto;
}

.g-data-table__head-cell,
.g-data-table__cell,
.g-data-table__section-cell {
  overflow: hidden;
  padding: var(--g-data-table-cell-padding-y) var(--g-data-table-cell-padding-x);
  vertical-align: middle;
}

.g-data-table__head-label,
.g-data-table__cell-text,
.g-data-table__section-text {
  display: block;
}

.g-data-table__head-cell--overflow-ellipsis,
.g-data-table__cell--overflow-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.g-data-table__head-cell--overflow-wrap,
.g-data-table__cell--overflow-wrap {
  white-space: normal;
  overflow-wrap: anywhere;
}

.g-data-table__cell--overflow-wrap {
  height: auto;
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
  --g-data-table-row-current-bg: var(--g-data-table-row-bg);
  --g-data-table-row-current-hover-bg: var(--g-data-table-row-hover-bg);
  background: var(--g-data-table-row-current-bg);
}

.g-data-table__row--section {
  --g-data-table-row-current-bg: var(--g-data-table-section-bg);
  --g-data-table-row-current-hover-bg:
    color-mix(in srgb, var(--g-data-table-section-divider) 12%, var(--g-data-table-section-bg));
  background: var(--g-data-table-section-bg);
}

.g-data-table__row--total {
  --g-data-table-row-current-bg: var(--g-data-table-total-bg);
  --g-data-table-row-current-hover-bg:
    color-mix(in srgb, var(--g-data-table-total-divider) 12%, var(--g-data-table-total-bg));
  background: var(--g-data-table-total-bg);
}

.g-data-table__row--tinted {
  background: color-mix(in srgb, var(--g-data-table-row-accent-text) 10%, var(--g-data-table-row-current-bg));
}

.g-data-table--row-hover .g-data-table__row:hover {
  background: var(--g-data-table-row-current-hover-bg);
}

.g-data-table--row-hover .g-data-table__row--tinted:hover {
  background: color-mix(in srgb, var(--g-data-table-row-accent-text) 16%, var(--g-data-table-row-current-bg));
}

.g-data-table__row--default:not(:last-child) .g-data-table__cell {
  border-bottom: var(--g-data-table-divider-width) solid var(--g-data-table-divider);
}

.g-data-table__cell {
  height: var(--g-data-table-row-height);
  color: var(--g-data-table-cell-text);
  font-size: var(--g-data-table-cell-size);
  line-height: var(--g-data-table-cell-line-height);
  font-weight: var(--g-data-table-cell-weight);
}

.g-data-table__row--total .g-data-table__cell {
  color: var(--g-data-table-total-text);
  border-bottom: var(--g-data-table-divider-width) solid var(--g-data-table-total-divider);
  font-weight: var(--g-data-table-header-weight);
}

.g-data-table__row--total .g-data-table__cell + .g-data-table__cell {
  border-left-color: var(--g-data-table-total-divider);
}

.g-data-table__section-cell {
  height: var(--g-data-table-row-height);
  color: var(--g-data-table-section-text);
  border-bottom: var(--g-data-table-divider-width) solid var(--g-data-table-section-divider);
  font-size: var(--g-data-table-cell-size);
  line-height: var(--g-data-table-cell-line-height);
  font-weight: var(--g-data-table-header-weight);
}

.g-data-table__row--tinted .g-data-table__cell,
.g-data-table__row--tinted .g-data-table__section-cell {
  color: var(--g-data-table-row-accent-text);
}

.g-data-table__head-cell--muted,
.g-data-table__cell--muted {
  color: var(--g-data-table-cell-text-muted);
}

.g-data-table__row--total .g-data-table__cell--muted {
  color: var(--g-data-table-total-text-muted);
}

.g-data-table__row--tinted .g-data-table__cell--muted {
  color: color-mix(in srgb, var(--g-data-table-row-accent-text) 72%, var(--g-data-table-cell-text-muted));
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
