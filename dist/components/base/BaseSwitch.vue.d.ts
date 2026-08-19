type __VLS_Props = {
    modelValue?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    change: (event: Event) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onChange?: ((event: Event) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: boolean;
    ariaLabel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
