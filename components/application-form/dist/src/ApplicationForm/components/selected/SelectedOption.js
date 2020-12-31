import * as React from "react";
import { useState } from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import { Picker } from 'react-native-wheel-pick';
import Button from "../../../Button";
import Appear from "../../../Appear";
import Layout from "../../../Layout";
import Text from "../../../Text";
const getKey = (keyName, Component) => props => (React.createElement(Component, Object.assign({ key: props[keyName] }, props)));
const SelectedOption = (item) => {
    const value = useSpringAnimation(0, item.selected ? 1 : 0, {
        speed: 0.5,
        bounciness: 3,
        delay: 300
    });
    const options = [{ label: "", value: undefined }, ...item.options];
    const [selected, setSelected] = useState(item.defaultValue);
    return (React.createElement(Layout, { style: { height: 350 } },
        React.createElement(Layout, { pv: 10, ph: 20 },
            React.createElement(Text, { h4: true },
                item.selectedTitle || item.placeholder || item.label,
                ": ")),
        React.createElement(Picker, { selectedValue: selected, style: { backgroundColor: 'transparent', height: 250, width: 250 }, pickerData: options.map(v => v.label), onValueChange: (itemValue) => {
                var _a;
                const value = (_a = options.find(v => v.label === itemValue)) === null || _a === void 0 ? void 0 : _a.value;
                console.log('onValueChange', { itemValue, value });
                item.update(value);
                setSelected(value);
            } }),
        React.createElement(Appear, { visible: selected },
            React.createElement(Button, { onPress: () => item.next() }, item.nextLabel))));
};
SelectedOption.defaultProps = {
    nextLabel: 'Далее'
};
export default SelectedOption;
//# sourceMappingURL=SelectedOption.js.map