export declare type StaticItemModel<T> = T & {
    type: string;
    elementType: string;
    key: string;
    formKey: string;
};
declare const parseConfig: <T extends unknown>(config: any) => StaticItemModel<T>[];
export default parseConfig;
