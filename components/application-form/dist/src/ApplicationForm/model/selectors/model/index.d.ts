declare const model: import("reselect").Selector<unknown, {
    selectedKey: any;
    selectedItem: any;
    items: unknown;
    submitted: unknown;
    select: (key: string | null) => void;
    save: unknown;
    unselect: () => void;
    errors: unknown;
}>;
export default model;
