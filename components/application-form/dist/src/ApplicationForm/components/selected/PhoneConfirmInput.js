import upgrade from "../../../../utils/upgrade";
import SelectedPhoneInput from "./PhoneInput";
import React from "react";
import Layout from "../../../Layout";
import Input from "../../../Input";
import Block from "@kross77/rn-block";
const Scale = upgrade(Block, ({ scale, style }) => ({
    style: Object.assign(Object.assign({}, style), { transform: [...((style === null || style === void 0 ? void 0 : style.transform) || []), { scale }] })
}));
const PhoneConfirmInput = props => {
    return (React.createElement(Layout, { row: true },
        React.createElement(SelectedPhoneInput, Object.assign({}, props)),
        React.createElement(Scale, { scale: 0.8, opacity: 0.3 },
            React.createElement(Input, Object.assign({ code: true, disabled: false, value: "+375292051020" }, props)),
            React.createElement(Input, Object.assign({ disabled: false, value: "+375292051020" }, props)))));
};
export default PhoneConfirmInput;
//# sourceMappingURL=PhoneConfirmInput.js.map