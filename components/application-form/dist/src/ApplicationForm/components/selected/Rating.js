var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { TouchableOpacity } from "react-native";
import Layout from "../../../Layout";
import Input from "../../../Input";
import Appear from "../../../Appear";
import Button from "../../../Button";
import Text from "../../../Text";
import createTypeComponent from "../../../../utils/createTypeComponent";
import { default as DisplayRating } from "../../../Rating";
import { useSingleLink } from "../../../../utils/linkUtils";
const Display = (_a) => {
    var { defaultValue, select } = _a, props = __rest(_a, ["defaultValue", "select"]);
    return (React.createElement(TouchableOpacity, { activeOpacity: 0.8, onPress: select, disabled: !select, style: { opacity: !select ? 0.5 : 1 } },
        React.createElement(Layout, { pointerEvents: 'none' }, defaultValue ? (React.createElement(Layout, null,
            React.createElement(Text, { meta: true }, props.label),
            React.createElement(DisplayRating, { value: defaultValue, size: 20, padding: 1 }))) : (React.createElement(Input, Object.assign({ string: true }, props))))));
};
const Focused = ({ label, description, update, next, defaultValue }) => {
    const link = useSingleLink(4);
    return (React.createElement(Layout, { gap: 50 },
        React.createElement(Layout, { gap: 20, ph: 30 },
            React.createElement(Text, { h2: true }, label),
            React.createElement(Text, { h5: true }, description)),
        React.createElement(Layout, { pv: 50 },
            React.createElement(Input, { type: "rating", defaultValue: link.value, onFinishRating: value => {
                    const rounded = Math.round(value * 10) / 10;
                    link.set(rounded);
                } })),
        React.createElement(Appear, { visible: true },
            React.createElement(Button, { onPress: () => {
                    update(link.value);
                    next();
                } }, "\u0414\u0430\u043B\u0435\u0435"))));
};
const Rating = createTypeComponent({
    focused: Focused,
    display: Display
}, "behaviour", true);
export default Rating;
//# sourceMappingURL=Rating.js.map