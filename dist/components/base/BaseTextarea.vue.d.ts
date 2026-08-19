type __VLS_Props = {
    modelValue?: string;
    label?: string;
    helperText?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    input: (event: Event) => any;
    "update:modelValue": (value: string) => any;
    change: (event: Event) => any;
    focus: (event: FocusEvent) => any;
    blur: (event: FocusEvent) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onInput?: ((event: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((event: Event) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
}>, {
    disabled: boolean;
    label: string;
    modelValue: string;
    helperText: string;
    placeholder: string;
    readonly: boolean;
    invalid: boolean;
    rows: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
