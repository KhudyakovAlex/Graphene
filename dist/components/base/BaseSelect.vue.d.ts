type BaseSelectSize = 'sm' | 'md' | 'lg';
type BaseSelectValue = string | string[];
export interface BaseSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
type __VLS_Props = {
    modelValue?: BaseSelectValue;
    options?: BaseSelectOption[];
    label?: string;
    helperText?: string;
    placeholder?: string;
    size?: BaseSelectSize;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    loading?: boolean;
    clearable?: boolean;
    multiple?: boolean;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: BaseSelectValue) => any;
    change: (event: Event) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
    clear: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: BaseSelectValue) => any) | undefined;
    onChange?: ((event: Event) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onClear?: (() => any) | undefined;
}>, {
    size: BaseSelectSize;
    disabled: boolean;
    label: string;
    modelValue: BaseSelectValue;
    helperText: string;
    placeholder: string;
    readonly: boolean;
    invalid: boolean;
    options: BaseSelectOption[];
    loading: boolean;
    clearable: boolean;
    multiple: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
