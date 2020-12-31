export interface ObjectLink<T> {
    update: (updatedValue: Partial<T>) => void;
    set: (value: T) => void;
    value: T;
    cb: (updatedPropName: string) => (updatedValue: any) => void;
}
declare const useObjectLink: <T extends Object>(defaultValue: T) => ObjectLink<T>;
export default useObjectLink;
