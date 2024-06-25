
declare const _default: import('vue').DefineComponent<{
    readonly modelValue: import("vue").PropType<string | number>;
    readonly size: import("vue").PropType<import("../../../utils").ComicSize>;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: string | number) => boolean;
    change: (val: string | number) => boolean;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: import("vue").PropType<string | number>;
    readonly size: import("vue").PropType<import("../../../utils").ComicSize>;
}>> & {
    onChange?: (val: string | number) => any;
    "onUpdate:modelValue"?: (val: string | number) => any;
}, {}, {}>;
export default _default;
