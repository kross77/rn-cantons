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
import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import { useSingleLink } from "../../../../utils/linkUtils";
import { useEffect } from "react";
const SelectedString = (_a) => {
    var { onFieldChange } = _a, item = __rest(_a, ["onFieldChange"]);
    const valueLink = useSingleLink(item.defaultValue);
    const update = () => {
        item.update(valueLink.value);
    };
    useEffect(() => {
        onFieldChange && onFieldChange(valueLink.value);
    }, [valueLink.value]);
    return (React.createElement(Layout, { ph: 15 },
        React.createElement(Tag, { size: 80, icon: item.icon }),
        React.createElement(Text, { h4: true }, item.label),
        React.createElement(Input, Object.assign({}, item, { onChangeText: valueLink.set, onBlur: () => {
                update();
                item.onBlur && item.onBlur();
            }, icon: null, label: null, multiline: false })),
        item.validationError && React.createElement(Text, { h7: true },
            "\u26A0\uFE0F",
            item.validationError)));
};
export default SelectedString;
//# sourceMappingURL=SelectedString.js.map