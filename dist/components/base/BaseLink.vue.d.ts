type BaseLinkTarget = '_self' | '_blank' | '_parent' | '_top';
type __VLS_Props = {
    href?: string;
    target?: BaseLinkTarget;
    rel?: string;
    disabled?: boolean;
};
declare var __VLS_10: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    disabled: boolean;
    href: string;
    target: BaseLinkTarget;
    rel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
