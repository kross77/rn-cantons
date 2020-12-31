import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import Button from "../../../Button";
import { useSingleLink } from "../../../../utils/linkUtils";
const MultilineSelectedString = item => {
    const valueLink = useSingleLink(item.defaultValue);
    const onNext = () => {
        item.update(valueLink.value);
        item.next();
    };
    return (React.createElement(Layout, { ph: 15 },
        React.createElement(Tag, { size: 80, icon: item.icon }),
        React.createElement(Text, { h4: true }, item.label),
        React.createElement(Input, Object.assign({}, item, { onChangeText: valueLink.set, onBlur: () => {
                item.update(valueLink.value);
                item.onBlur && item.onBlur();
            }, icon: null, autoFocus: true, label: null, multiline: true })),
        item.validationError && React.createElement(Text, { h7: true },
            "\u26A0\uFE0F",
            item.validationError),
        React.createElement(Button, { onPress: onNext }, "\u0414\u0430\u043B\u0435\u0435")));
};
export default MultilineSelectedString;
//# sourceMappingURL=Multiline.js.map