import { DataGridColumn, DataGridColumnWidths, DataGridFilters, DataGridSort, DataTableLayout, DataTableRow } from './types';
type __VLS_Props = {
    columns: DataGridColumn[];
    rows: DataTableRow[];
    layout?: DataTableLayout;
    rowHover?: boolean;
    sort?: DataGridSort | null;
    filters?: DataGridFilters;
    hiddenColumnKeys?: string[];
    columnWidths?: DataGridColumnWidths;
};
declare function toggleSort(column: DataGridColumn): void;
declare var __VLS_1: {
    columnWidths: DataGridColumnWidths;
    columns: DataGridColumn[];
    filters: DataGridFilters;
    hiddenColumnKeys: string[];
    resetGrid: () => void;
    setColumnVisibility: (columnKey: string, visible: boolean) => void;
    setFilter: (columnKey: string, value: string) => void;
    setSort: (sort: DataGridSort | null) => void;
    sort: DataGridSort | null;
    toggleSort: (column: DataGridColumn) => void;
    visibleColumns: DataGridColumn[];
}, __VLS_41: `header-${string}`, __VLS_42: {
    sort: {
        key: string;
        direction: import('./types').DataGridSortDirection;
    } | null;
    sortDirection: import('./types').DataGridSortDirection | null;
    toggleSort: typeof toggleSort;
    column: import('./types').DataTableColumn;
    columnIndex: number;
}, __VLS_44: {
    sort: {
        key: string;
        direction: import('./types').DataGridSortDirection;
    } | null;
    sortDirection: import('./types').DataGridSortDirection | null;
    toggleSort: typeof toggleSort;
    column: import('./types').DataTableColumn;
    columnIndex: number;
}, __VLS_48: `cell-${string}`, __VLS_49: {
    sort: {
        key: string;
        direction: import('./types').DataGridSortDirection;
    } | null;
    column: import('./types').DataTableColumn;
    columnIndex: number;
    row: DataTableRow;
    rowIndex: number;
    value: unknown;
    text: string;
}, __VLS_51: {
    sort: {
        key: string;
        direction: import('./types').DataGridSortDirection;
    } | null;
    column: import('./types').DataTableColumn;
    columnIndex: number;
    row: DataTableRow;
    rowIndex: number;
    value: unknown;
    text: string;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_41>]?: (props: typeof __VLS_42) => any;
} & {
    [K in NonNullable<typeof __VLS_48>]?: (props: typeof __VLS_49) => any;
} & {
    toolbar?: (props: typeof __VLS_1) => any;
} & {
    header?: (props: typeof __VLS_44) => any;
} & {
    cell?: (props: typeof __VLS_51) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:sort": (value: DataGridSort | null) => any;
    "update:filters": (value: DataGridFilters) => any;
    "update:hiddenColumnKeys": (value: string[]) => any;
    "update:columnWidths": (value: DataGridColumnWidths) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:sort"?: ((value: DataGridSort | null) => any) | undefined;
    "onUpdate:filters"?: ((value: DataGridFilters) => any) | undefined;
    "onUpdate:hiddenColumnKeys"?: ((value: string[]) => any) | undefined;
    "onUpdate:columnWidths"?: ((value: DataGridColumnWidths) => any) | undefined;
}>, {
    sort: DataGridSort | null;
    layout: DataTableLayout;
    rowHover: boolean;
    filters: DataGridFilters;
    hiddenColumnKeys: string[];
    columnWidths: DataGridColumnWidths;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
