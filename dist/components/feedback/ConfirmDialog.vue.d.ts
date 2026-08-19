type DialogCloseReason = 'backdrop' | 'escape' | 'close-button';
type ConfirmDialogConfirmVariant = 'primary' | 'secondary';
type __VLS_Props = {
    modelValue?: boolean;
    title?: string;
    description?: string;
    ariaLabel?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: ConfirmDialogConfirmVariant;
    confirmDisabled?: boolean;
    cancelDisabled?: boolean;
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
    "update:modelValue": (value: boolean) => any;
    cancel: () => any;
    close: (reason: DialogCloseReason) => any;
    confirm: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onClose?: ((reason: DialogCloseReason) => any) | undefined;
    onConfirm?: (() => any) | undefined;
}>, {
    title: string;
    modelValue: boolean;
    ariaLabel: string;
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    showCloseButton: boolean;
    description: string;
    confirmText: string;
    cancelText: string;
    confirmVariant: ConfirmDialogConfirmVariant;
    confirmDisabled: boolean;
    cancelDisabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
