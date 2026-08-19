type __VLS_Props = {
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    ariaLabel?: string;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    input: (event: Event) => any;
    "update:modelValue": (value: number) => any;
    change: (event: Event) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onInput?: ((event: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((event: Event) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: number;
    ariaLabel: string;
    min: number;
    max: number;
    step: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
