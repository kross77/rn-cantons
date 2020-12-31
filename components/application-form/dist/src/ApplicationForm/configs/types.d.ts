import { TextInputProps } from "react-native";
interface FormItemString extends TextInputProps {
    label?: string;
    validation?: string;
    description?: string;
    required?: boolean;
    icon: string;
}
interface FormItemSelect extends FormItemString {
    options: {
        label: string;
        value: string;
    }[];
}
interface FormItemReference extends FormItemString {
    component: "reference";
    configName: "string";
}
export declare type FormItemConfig = (FormItemString & {
    component: "string" | "phone" | "photo";
}) | (FormItemSelect & {
    component: "select";
}) | (FormItemReference & {
    component: "reference";
});
export {};
