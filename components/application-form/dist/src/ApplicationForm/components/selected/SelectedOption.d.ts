/// <reference types="react" />
interface SelectedOption<Value> {
    selected?: any;
    options: {
        label: string;
        value: Value;
    };
    defaultValue?: Value;
    selectedTitle?: string;
    placeholder?: string;
    label: string;
    update: (v: Value) => void;
    next: () => void;
    nextLabel?: string;
}
declare const SelectedOption: {
    <T extends unknown>(item: SelectedOption<T>): JSX.Element;
    defaultProps: {
        nextLabel: string;
    };
};
export default SelectedOption;
