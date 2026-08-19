import { DataTableColumn, DataTableLayout, DataTableRow } from './types';
type __VLS_Props = {
    columns: DataTableColumn[];
    rows: DataTableRow[];
    layout?: DataTableLayout;
    rowHover?: boolean;
};
declare var __VLS_2: `header-${string}`, __VLS_3: {
    column: DataTableColumn;
    columnIndex: number;
}, __VLS_5: {
    column: DataTableColumn;
    columnIndex: number;
}, __VLS_7: {
    row: DataTableRow;
    rowIndex: number;
    label: string;
}, __VLS_10: `cell-${string}`, __VLS_11: {
    column: DataTableColumn;
    columnIndex: number;
    row: DataTableRow;
    rowIndex: number;
    value: unknown;
    text: string;
}, __VLS_13: {
    column: DataTableColumn;
    columnIndex: number;
    row: DataTableRow;
    rowIndex: number;
    value: unknown;
    text: string;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
} & {
    [K in NonNullable<typeof __VLS_10>]?: (props: typeof __VLS_11) => any;
} & {
    header?: (props: typeof __VLS_5) => any;
} & {
    section?: (props: typeof __VLS_7) => any;
} & {
    cell?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    layout: DataTableLayout;
    rowHover: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
