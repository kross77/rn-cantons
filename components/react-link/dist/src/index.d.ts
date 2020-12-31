export * as useObjectLink from './useObjectLink';
export declare type Link<T extends any> = [T, (v: T) => void];
export declare const createArrayLinkInterface: <T extends unknown>([value, setValue]: Link<T[]>) => ArrayLink<T>;
export declare const updateOne: <T extends unknown>([value, setValue]: Link<T>) => {
    value: T;
    update: (v: T) => void;
};
export declare const updateSingle: <T extends unknown>([value, setValue]: Link<T>) => {
    value: T;
    set: (v: T) => void;
    cb: (value: T) => () => void;
};
export interface ArrayLink<T> {
    update: (index: number, updatedValue: T) => void;
    set: (value: T[]) => void;
    add: (item: T) => number;
    move: (oldIndex: number, newIndex: number) => void;
    remove: (index: number) => void;
    pop: () => void;
    value: T[];
}
export interface SingleLink<T> {
    set: (value: T) => void;
    cb: (value: T) => () => void;
    value: T;
}
export declare const useArrayLink: <T>(initState: T[] | (() => T[])) => ArrayLink<T>;
export declare const useSingleLink: <T>(initState: T | (() => T)) => SingleLink<T>;
