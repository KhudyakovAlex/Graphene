declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import('vue').DefineComponent<{
    modelValue?: boolean;
    title?: string;
    description?: string;
    ariaLabel?: string;
    submitText?: string;
    cancelText?: string;
    submitDisabled?: boolean;
    cancelDisabled?: boolean;
    submitting?: boolean;
    formId?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (event: SubmitEvent) => any;
    "update:modelValue": (value: boolean) => any;
    cancel: () => any;
    close: (reason: "backdrop" | "escape" | "close-button") => any;
}, string, import('vue').PublicProps, Readonly<{
    modelValue?: boolean;
    title?: string;
    description?: string;
    ariaLabel?: string;
    submitText?: string;
    cancelText?: string;
    submitDisabled?: boolean;
    cancelDisabled?: boolean;
    submitting?: boolean;
    formId?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
}> & Readonly<{
    onSubmit?: ((event: SubmitEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onClose?: ((reason: "backdrop" | "escape" | "close-button") => any) | undefined;
}>, {
    title: string;
    modelValue: boolean;
    ariaLabel: string;
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    showCloseButton: boolean;
    description: string;
    cancelText: string;
    cancelDisabled: boolean;
    submitText: string;
    submitDisabled: boolean;
    submitting: boolean;
    formId: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    default?: (props: {}) => any;
} & {
    footer?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
