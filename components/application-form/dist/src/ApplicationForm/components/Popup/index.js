import { default as React } from "react";
import Layout from "../../../Layout";
import Tags from "./components/Tags";
import { View } from "react-native";
import createTypeComponent from "../../../../utils/createTypeComponent";
import { selectedComponents } from "../selected";
export const SelectedComponents = createTypeComponent(selectedComponents);
export const didMountWrapper = (Wrapped, mes = "") => class extends React.Component {
    componentDidMount() { }
    render() {
        return React.createElement(Wrapped, Object.assign({}, this.props));
    }
};
const PopupContent = ({ requiredFieldsFilledConfirmation = true, isTags = true, model, }) => {
    return (React.createElement(Layout, null,
        React.createElement(View, { style: { width: '100%', minHeight: 250 }, keyboardShouldPersistTaps: 'always', overScrollMode: 'always', showsVerticalScrollIndicator: true },
            React.createElement(SelectedComponents, Object.assign({}, model.selectedItem)),
            isTags && model.items.length > 1 && (React.createElement(Layout, { justify: "center", flexWrap: "wrap", pv: 15, align: "center", width: "auto", row: true, gap: 10 }, model.items.map(Tags))))));
};
export default PopupContent;
//# sourceMappingURL=index.js.map