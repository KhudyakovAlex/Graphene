export type DataTableColumnAlign = 'left' | 'center' | 'right'
export type DataTableColumnOverflow = 'ellipsis' | 'wrap'
export type DataTableLayout = 'scroll' | 'fit'
export type DataTableRowKind = 'default' | 'section' | 'total'

export interface DataTableColumn {
  key: string
  label: string
  width?: string
  minWidth?: string
  align?: DataTableColumnAlign
  muted?: boolean
  overflow?: DataTableColumnOverflow
}

export interface DataTableRow {
  key?: string
  kind?: DataTableRowKind
  label?: string
  textColor?: string
  [key: string]: unknown
}

export interface DataTableHeaderSlotProps {
  column: DataTableColumn
  columnIndex: number
}

export interface DataTableCellSlotProps {
  column: DataTableColumn
  columnIndex: number
  row: DataTableRow
  rowIndex: number
  value: unknown
  text: string
}

export type DataGridSortDirection = 'asc' | 'desc'

export interface DataGridSort {
  key: string
  direction: DataGridSortDirection
}

export interface DataGridColumn extends DataTableColumn {
  sortable?: boolean
  filterable?: boolean
  hideable?: boolean
  resizable?: boolean
  defaultHidden?: boolean
}

export type DataGridFilters = Record<string, string>
export type DataGridColumnWidths = Record<string, string>
