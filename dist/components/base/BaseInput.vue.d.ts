type BaseInputSize = 'sm' | 'md' | 'lg';
type BaseInputType = 'text' | 'password' | 'search' | 'email' | 'number';
type __VLS_Props = {
    modelValue?: string;
    label?: string;
    helperText?: string;
    placeholder?: string;
    type?: BaseInputType;
    size?: BaseInputSize;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    trailing?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
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
    size: BaseInputSize;
    type: BaseInputType;
    disabled: boolean;
    label: string;
    modelValue: string;
    helperText: string;
    placeholder: string;
    readonly: boolean;
    invalid: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
