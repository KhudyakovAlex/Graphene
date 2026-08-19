type DialogCloseReason = 'backdrop' | 'escape' | 'close-button';
type __VLS_Props = {
    modelValue?: boolean;
    title?: string;
    ariaLabel?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
};
declare var __VLS_7: {}, __VLS_9: {}, __VLS_11: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_7) => any;
} & {
    default?: (props: typeof __VLS_9) => any;
} & {
    footer?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    close: (reason: DialogCloseReason) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onClose?: ((reason: DialogCloseReason) => any) | undefined;
}>, {
    title: string;
    modelValue: boolean;
    ariaLabel: string;
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    showCloseButton: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
