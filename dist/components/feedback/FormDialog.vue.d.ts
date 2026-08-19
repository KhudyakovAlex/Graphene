type DialogCloseReason = 'backdrop' | 'escape' | 'close-button';
type __VLS_Props = {
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
};
declare var __VLS_11: {}, __VLS_14: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
} & {
    footer?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (event: SubmitEvent) => any;
    "update:modelValue": (value: boolean) => any;
    cancel: () => any;
    close: (reason: DialogCloseReason) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSubmit?: ((event: SubmitEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onClose?: ((reason: DialogCloseReason) => any) | undefined;
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
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
