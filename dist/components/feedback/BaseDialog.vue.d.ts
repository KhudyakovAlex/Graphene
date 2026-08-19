declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import('vue').DefineComponent<{
    modelValue?: boolean;
    title?: string;
    ariaLabel?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    close: (reason: "backdrop" | "escape" | "close-button") => any;
}, string, import('vue').PublicProps, Readonly<{
    modelValue?: boolean;
    title?: string;
    ariaLabel?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onClose?: ((reason: "backdrop" | "escape" | "close-button") => any) | undefined;
}>, {
    title: string;
    modelValue: boolean;
    ariaLabel: string;
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    showCloseButton: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    title?: (props: {}) => any;
} & {
    default?: (props: {}) => any;
} & {
    footer?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
