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
import Dynamic from "../index";
import React from "react";
import Layout from "../../Layout";
import { ScrollView } from "react-native";
const groupByRequred = items => {
    if (items) {
        const [required, notRequired] = items.reduce(([r, nr], item) => {
            if (item.defaultValue || item.required) {
                r.push(item);
            }
            else {
                nr.push(item);
            }
            return [r, nr];
        }, [[], []]);
        return [required, notRequired];
    }
    return [];
};
const Form = ({ items, wrapper: Wrapper = ScrollView, components, layout, scrollView }) => {
    const [required, notRequired] = groupByRequred(items);
    const toTags = (_a) => {
        var { type } = _a, item = __rest(_a, ["type"]);
        return (Object.assign({ type: "tag" }, item));
    };
    return (React.createElement(Wrapper, Object.assign({}, scrollView),
        React.createElement(Layout, Object.assign({}, layout),
            React.createElement(Dynamic, { components: components, items: required || [] }),
            React.createElement(Layout, { row: true, flexWrap: "wrap", justify: "center" },
                React.createElement(Dynamic, { components: components, items: notRequired ? notRequired.map(toTags) : [] })))));
};
export default Form;
//# sourceMappingURL=index.js.map