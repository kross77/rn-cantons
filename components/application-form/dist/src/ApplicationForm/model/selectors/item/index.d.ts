declare const itemSelector: import("reselect").OutputParametricSelector<unknown, any, any, (res1: any, res2: {
    defaultValue: any;
    selected: boolean;
    validationError: any;
    enablesReturnKeyAutomatically: boolean;
    state: any;
    update: (value: any) => void;
    next: ((value: any) => Promise<void>) | (() => void);
    select: () => void;
    validate: (value: any) => Promise<{
        error: any;
    }>;
    updateModel: (key: string, value: any) => any;
    setState: (updated: any) => void;
}) => any>;
export default itemSelector;
