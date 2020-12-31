var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import { useContext, useEffect } from "react";
import Button from "../../../Button";
import Block from "@kross77/rn-block/dist";
import createTypeComponent from "../../../../utils/createTypeComponent";
import Icon from "../../../Icon";
import Colors from "../../../Colors";
import useRepeatAnimation from "../../../../native/animation/useRepeatAnimation";
import { Animated } from "react-native";
import { useSingleLink } from "../../../../utils/linkUtils";
import useFirebasePhoneLogin, { FirebaseAuthPhoneState } from "../../../../firebase/auth/useFirebasePhoneLogin";
import auth from "@react-native-firebase/auth";
import { ModalsContext } from "../../../Animation/components/Modals";
const SelectedPhoneConfirmationString = item => {
    return (React.createElement(Layout, { gap: 10, ph: 15 },
        React.createElement(Block, { height: 50 },
            React.createElement(Tag, { size: 50, icon: item.icon })),
        React.createElement(Text, { h4: true }, item.label),
        React.createElement(Layout, { width: "100%", gap: 10 },
            React.createElement(Input, Object.assign({}, item, { autoFocus: true, onChangeText: item.update, icon: null, label: null, keyboardType: "phone-pad", multiline: false, disabled: false, onBlur: () => item.next() })),
            React.createElement(Layout, null,
                item.error && React.createElement(Layout, { pv: 10 },
                    React.createElement(Text, { error: true },
                        "\u274C",
                        item.error)),
                item.warning && React.createElement(Layout, { pv: 10 },
                    React.createElement(Text, { meta: true, align: 'left' },
                        "\u26A0\uFE0F",
                        item.warning)),
                React.createElement(Button, { disabled: item.disabled, onPress: () => item.next() }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C")))));
};
const SelectedCodeString = item => {
    return (React.createElement(Layout, { gap: 10, ph: 15 },
        React.createElement(Block, { height: 50 },
            React.createElement(Tag, { size: 50, icon: "lock" })),
        React.createElement(Text, { h4: true }, "SMS \u043A\u043E\u0434"),
        React.createElement(Layout, { width: "100%" },
            React.createElement(Input, { autoFocus: true, placeholder: "Введите SMS код потверждения", keyboardType: "numeric", onChangeText: item.update, onBlur: item.next, icon: null, label: null, multiline: false })),
        item.error && React.createElement(Layout, { pv: 10 },
            React.createElement(Text, { error: true },
                "\u274C",
                item.error)),
        item.warning && React.createElement(Layout, { pv: 10 },
            React.createElement(Text, { meta: true, align: 'left' },
                "\u26A0\uFE0F",
                item.warning)),
        React.createElement(Button, { disabled: item.disabled, onPress: () => item.next() }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C")));
};
const Loading = props => {
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
const Success = props => {
    return (React.createElement(Layout, { center: true, gap: 10, ph: 15 },
        React.createElement(Block, { relative: true, height: 100 },
            React.createElement(Tag, { size: 100, icon: 'check', iconBackgroundColor: Colors.POSITIVE })),
        React.createElement(Text, { oversized: true }, "\u0412\u044B \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u043E\u043C:"),
        React.createElement(Text, { h5: true }, props.phoneNumber),
        React.createElement(Button, { onPress: () => auth().signOut() }, "\u0412\u044B\u0439\u0442\u0438")));
};
const StateComponent = createTypeComponent({
    phone: SelectedPhoneConfirmationString,
    code: SelectedCodeString,
    success: Success,
    loading: Loading
}, "active");
const getActiveState = (state) => ({
    [FirebaseAuthPhoneState.AUTHORIZING]: 'phone',
    [FirebaseAuthPhoneState.INPUT_PHONE]: 'phone',
    [FirebaseAuthPhoneState.INPUT_CODE]: 'code',
    [FirebaseAuthPhoneState.SENDING_PHONE]: 'loading',
    [FirebaseAuthPhoneState.SENDING_CODE]: 'loading',
    [FirebaseAuthPhoneState.ERROR_CODE]: 'code',
    [FirebaseAuthPhoneState.ERROR_PHONE]: 'phone',
    [FirebaseAuthPhoneState.SUCCESS]: 'success',
})[state];
const statues = [
    "AUTHORIZING",
    "INPUT_PHONE",
    "SENDING_PHONE",
    "INPUT_CODE",
    "SENDING_CODE",
    "ERROR_PHONE",
    "ERROR_CODE",
    "SUCCESS",
];
const PhoneConfirmation = props => {
    var _a, _b, _c, _d, _e;
    const phone = useSingleLink(props.defaultValue);
    const code = useSingleLink("");
    const modals = useContext(ModalsContext);
    const phoneConfirmed = useSingleLink(false);
    const codeConfirmed = useSingleLink(false);
    const validationError = useSingleLink(null);
    const [phoneAuthState, error, phoneNumber] = useFirebasePhoneLogin({ phone: phoneConfirmed.value ? phone.value : undefined, code: codeConfirmed.value ? code.value : undefined });
    useEffect(() => {
        if (phoneAuthState === FirebaseAuthPhoneState.INPUT_CODE || phoneAuthState === FirebaseAuthPhoneState.ERROR_PHONE) {
            phoneConfirmed.set(false);
        }
        if (phoneAuthState === FirebaseAuthPhoneState.INPUT_PHONE || phoneAuthState === FirebaseAuthPhoneState.ERROR_CODE) {
            codeConfirmed.set(false);
        }
        if (phoneAuthState === FirebaseAuthPhoneState.SUCCESS) {
            modals.pop();
        }
    }, [phoneAuthState]);
    useEffect(() => {
        if (phoneNumber) {
            props.update(phoneNumber);
        }
    }, [phoneNumber]);
    useEffect(() => {
        const validate = () => __awaiter(void 0, void 0, void 0, function* () {
            const r = yield props.validate(phone.value);
            validationError.set(r);
        });
        validate();
    }, [phone.value]);
    useEffect(() => {
    }, [(_a = validationError.value) === null || _a === void 0 ? void 0 : _a.error]);
    return (React.createElement(React.Fragment, null,
        React.createElement(StateComponent, Object.assign({ error: error, cancel: () => phoneConfirmed.set(false), warning: (_b = validationError.value) === null || _b === void 0 ? void 0 : _b.error, phoneNumber: phoneNumber, active: getActiveState(phoneAuthState) }, props, { update: phoneAuthState < 3 ? phone.set : code.set, next: phoneAuthState < 3 ? () => phoneConfirmed.set(true) : () => codeConfirmed.set(true), disabled: phoneAuthState < 3 ? ((_c = phone.value) === null || _c === void 0 ? void 0 : _c.length) === 0 || ((_d = validationError.value) === null || _d === void 0 ? void 0 : _d.error) !== null : ((_e = code.value) === null || _e === void 0 ? void 0 : _e.length) < 6 }))));
};
export default PhoneConfirmation;
//# sourceMappingURL=PhoneConfirmation.js.map