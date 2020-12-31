/// <reference types="react" />
import { OneLevelObject, OneParamCallback, ReactComponents, Collection } from "../../../utils/commonTypes";
import { ILayout } from "../../Layout";
import { ScrollView } from "react-native";
interface Form {
    values: OneLevelObject;
    model: Collection<any>;
    components: ReactComponents;
    onFormUpdate: OneParamCallback;
    onSelect: OneParamCallback;
}
interface Form {
    items: Collection<any>;
    layout?: ILayout;
    scrollView?: ScrollView;
    components: ReactComponents;
}
declare const Form: ({ items, wrapper: Wrapper, components, layout, scrollView }: Form) => JSX.Element;
export default Form;
