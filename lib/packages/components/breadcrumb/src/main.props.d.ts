import { ExtractPropTypes } from 'vue';

export declare const breadcrumbProps: {
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly separatorIcon: StringConstructor;
    readonly color: StringConstructor;
    readonly fill: BooleanConstructor;
    readonly closeboth: BooleanConstructor;
};
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
