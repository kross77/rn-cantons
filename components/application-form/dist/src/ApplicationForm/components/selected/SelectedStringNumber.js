import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import { Keyboard } from "react-native";
import { Picker } from "react-native-wheel-pick";
import { useEffect, useRef, useState } from "react";
import Appear from "../../../Appear";
import Button from "../../../Button";
import { useSingleLink } from "../../../../utils/linkUtils";
const getKey = (keyName, Component) => props => (React.createElement(Component, Object.assign({ key: props[keyName] }, props)));
const SelectedStringNumber = item => {
    var _a, _b;
    const options = [{ label: "", value: undefined }, ...item.options];
    const textRef = useRef();
    const textLink = useSingleLink((_a = item.defaultValue) === null || _a === void 0 ? void 0 : _a.inputValue);
    const [selected, setSelected] = useState((_b = item.defaultValue) === null || _b === void 0 ? void 0 : _b.optionValue);
    useEffect(() => {
        item.update({ inputValue: textLink.value, optionValue: selected });
    }, [textLink.value]);
    useEffect(() => {
        if (selected) {
            textRef.current.focus();
        }
        else {
            Keyboard.dismiss();
        }
    }, [!!selected]);
    return (React.createElement(Layout, { ph: 15 },
        React.createElement(Tag, { size: 80, icon: item.icon }),
        React.createElement(Text, { h4: true }, item.label),
        React.createElement(Appear, { visible: selected },
            React.createElement(Input, Object.assign({}, item, { ref: textRef, defaultValue: textLink.value, keyboardType: "numeric", onChangeText: textLink.set, icon: null, label: null, multiline: false }))),
        React.createElement(Layout, { height: 140 },
            React.createElement(Picker, { selectedValue: selected, style: { backgroundColor: 'white', height: 140, width: 250 }, pickerData: options.map(v => v.label), onValueChange: (itemValue) => {
                    var _a;
                    const value = (_a = options.find(v => v.label === itemValue)) === null || _a === void 0 ? void 0 : _a.value;
                    item.update({ optionValue: value, inputValue: textLink.value });
                    setSelected(itemValue);
                } })),
        React.createElement(Button, { disabled: !Number(textLink.value) > 0, onPress: item.next }, "\u0414\u0430\u043B\u0435\u0435"),
        item.validationError && React.createElement(Text, { h7: true },
            "\u26A0\uFE0F",
            item.validationError)));
};
export default SelectedStringNumber;
//# sourceMappingURL=SelectedStringNumber.js.map