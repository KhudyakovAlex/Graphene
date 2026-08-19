type BaseRadioValue = string | number | boolean;
type __VLS_Props = {
    modelValue?: BaseRadioValue;
    value?: BaseRadioValue;
    name?: string;
    disabled?: boolean;
    ariaLabel?: string;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: BaseRadioValue) => any;
    change: (event: Event) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: BaseRadioValue) => any) | undefined;
    onChange?: ((event: Event) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: BaseRadioValue;
    ariaLabel: string;
    value: BaseRadioValue;
    name: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
