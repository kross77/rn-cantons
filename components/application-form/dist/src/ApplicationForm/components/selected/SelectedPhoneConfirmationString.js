import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import Button from "../../../Button";
import Block from "@kross77/rn-block/dist";
import createTypeComponent from "../../../../utils/createTypeComponent";
import Icon from "../../../Icon";
import Colors from "../../../Colors";
import useRepeatAnimation from "../../../../native/animation/useRepeatAnimation";
import { Animated } from "react-native";
const SelectedPhoneConfirmationString = item => {
    return (React.createElement(Layout, { gap: 10, ph: 15 },
        React.createElement(Block, { height: 50 },
            React.createElement(Tag, { size: 50, icon: item.icon })),
        React.createElement(Text, { h4: true }, item.label),
        React.createElement(Layout, { width: "100%", gap: 10 },
            React.createElement(Input, Object.assign({}, item, { autoFocus: true, onChangeText: item.update, icon: null, label: null, keyboardType: "phone-pad", multiline: false, onBlur: () => item.next() })),
            React.createElement(Button, { onPress: () => item.next() }, "\u0412\u044B\u0441\u043B\u0430\u0442\u044C sms"))));
};
const SelectedCodeString = item => {
    return (React.createElement(Layout, { gap: 10, ph: 15 },
        React.createElement(Block, { height: 50 },
            React.createElement(Tag, { size: 50, icon: "lock" })),
        React.createElement(Text, { h4: true }, "SMS \u043A\u043E\u0434"),
        React.createElement(Layout, { width: "100%" },
            React.createElement(Input, { autoFocus: true, placeholder: "Введите SMS код потверждения", keyboardType: "numeric", onChangeText: item.updateModel("code"), onBlur: item.next, icon: null, label: null, multiline: false })),
        React.createElement(Button, { onPress: () => item.next() }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F")));
};
const Loading = (props) => {
    const value = useRepeatAnimation();
    return (React.createElement(Layout, { center: true, gap: 10, ph: 15 },
        React.createElement(Block, { relative: true, height: 100 },
            React.createElement(Tag, { size: 100, icon: "cloud" }),
            React.createElement(Block, { absolute: true, bottom: 5 },
                React.createElement(Animated.View, { style: {
                        transform: [
                            {
                                rotate: value.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "360deg"]
                                })
                            },
                            { translateX: 0.2 },
                            { translateY: 0.2 }
                        ]
                    } },
                    React.createElement(Icon, { iconColor: Colors.W100, color: "transparent", name: "cycle" })))),
        React.createElement(Text, { oversized: true }, "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u043F\u043E\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430...."),
        React.createElement(Button, { onPress: () => props.cancel() }, "\u041E\u0442\u043C\u0435\u043D\u0430")));
};
const StateComponent = createTypeComponent({
    phone: SelectedPhoneConfirmationString,
    code: SelectedCodeString,
    loading: Loading
}, "active");
const Select = props => {
    return React.createElement(StateComponent, Object.assign({ active: props.phoneConfirmState || "phone" }, props));
};
export default Select;
//# sourceMappingURL=SelectedPhoneConfirmationString.js.map