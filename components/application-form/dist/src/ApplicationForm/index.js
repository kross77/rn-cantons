import * as configs from "./configs";
import components from "./components";
import Form from "../Form";
import * as React from "react";
import { useContext, useEffect } from "react";
import Layout from "@rn-cantons/layout";
import useApplicationFormModel from "./model";
import PopupContent from "./components/Popup";
import Skin from './skin';
import Block from "@kross77/rn-block/dist";
import { ModalsContext } from "../Animation/components/Modals";
import { useFormSyncronization } from "./hooks/useFormSyncronization";
const ApplicationForm = ({ requiredFieldsFilledConfirmation, wrapper: Wrapper = React.Fragment, dataLink: dataLinkProp, children, onSave, isSubmit, form, isWarnings, name, defaultValue, layoutItems = {}, onClose, onFormSubmitted, submit, isTags }) => {
    const saveAction = onSave;
    const dataLink = dataLinkProp || useFormSyncronization(formId, name, defaultValue);
    const model = useApplicationFormModel(configs[name], dataLink, saveAction, onFormSubmitted);
    const modals = useContext(ModalsContext);
    useEffect(() => {
        const isOpen = !!(model && (model === null || model === void 0 ? void 0 : model.selectedKey));
        if (isOpen) {
            modals.pop();
            modals.add(React.createElement(PopupContent, { model: model, isTags: isTags, requiredFieldsFilledConfirmation: requiredFieldsFilledConfirmation }), model === null || model === void 0 ? void 0 : model.unselect);
        }
        else {
            modals.pop();
        }
    }, [model === null || model === void 0 ? void 0 : model.selectedKey]);
    const { Button, Text } = Skin;
    return (React.createElement(React.Fragment, null,
        React.createElement(Wrapper, null,
            React.createElement(Layout, Object.assign({ pv: 20, ph: 20 }, layoutItems),
                React.createElement(Form, Object.assign({ items: model === null || model === void 0 ? void 0 : model.items, components: components }, form)),
                children,
                React.createElement(Layout, { pv: 25 },
                    isSubmit &&
                        (React.createElement(Button, Object.assign({ icon: 'save', disabled: !model.submitted, chevron: false, children: 'Coхранить' }, submit, { onPress: () => {
                                model.save();
                                onClose();
                            } }))),
                    React.createElement(Block, { height: 30 }),
                    isWarnings && React.createElement(Layout, { gap: 10 }, model.errors.map(err => React.createElement(Text, { key: err }, err))))))));
};
export default ApplicationForm;
//# sourceMappingURL=index.js.map