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
import { ModalContent, BaseModal, SlideAnimation } from "react-native-modals";
import { Dimensions } from "react-native";
import { useArrayLink, useSingleLink } from "@rn-cantons/react-link";
import { Animated, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { upgrade } from "@rn-cantons/react-utils";
const useSpringAnimation = () => {
    const [value] = useState(new Animated.Value(0));
    return value;
};
const window = Dimensions.get('window');
const isFunction = (fn) => typeof fn === 'function';
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        backgroundColor: 'rgba(3,34,55,0.8)'
    },
    modal: {
        width: window.width - 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    }
});
export const ModalItem = ({ value = new Animated.Value(0), visibleLink, close: Close, keyboardHeight, children, }) => {
    return (React.createElement(BaseModal, { modalAnimation: new SlideAnimation({
            slideFrom: "bottom"
        }), style: StyleSheet.flatten([
            styles.container,
            {
                transform: [
                    {
                        translateY: value.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -1]
                        })
                    }
                ]
            }
        ]), modalStyle: StyleSheet.flatten([
            styles.modal,
            {
                paddingBottom: 20,
                maxHeight: window.height -
                    (isNaN(Number(keyboardHeight)) ? 0 : Number(keyboardHeight)) -
                    30,
                top: 20
            }
        ]), width: 1, visible: visibleLink.value, onTouchOutside: () => visibleLink.set(false) },
        React.createElement(ModalContent, null,
            children,
            Close && React.createElement(Close, null))));
};
export const ModalsContext = React.createContext([]);
export const useModals = () => {
    return useContext(ModalsContext);
};
const Modals = (_a) => {
    var { children, close, keyboardHeight } = _a, props = __rest(_a, ["children", "close", "keyboardHeight"]);
    const arrayLink = useArrayLink([]);
    const modelLink = Object.assign(Object.assign({}, arrayLink), { add: (item, onClose) => {
            if (onClose) {
                arrayLink.add(() => ({ item, onClose }));
            }
            else {
                arrayLink.add(item);
            }
        } });
    const childrenLink = useSingleLink([]);
    const value = useSpringAnimation(0, keyboardHeight, {
        useNativeDriver: true
    });
    useEffect(() => {
        var _a, _b;
        if (((_a = modelLink.value) === null || _a === void 0 ? void 0 : _a.length) > ((_b = childrenLink.value) === null || _b === void 0 ? void 0 : _b.length)) {
            childrenLink.set(modelLink.value);
        }
        else {
            setTimeout(() => {
                childrenLink.set(modelLink.value);
            }, 500);
        }
    }, [modelLink.value]);
    const modals = childrenLink.value.map((child, index) => {
        const { item, onClose } = isFunction(child) ? child() : { item: child };
        close = upgrade(close, { onClose });
        return (React.createElement(ModalItem, { close: close, visibleLink: {
                value: modelLink.value[index],
                set: v => {
                    if (v) {
                        modelLink.pop();
                    }
                    else {
                        onClose();
                    }
                }
            }, key: `modal${index}`, value: value, keyboardHeight: keyboardHeight }, item));
    });
    return (React.createElement(ModalsContext.Provider, Object.assign({ value: Object.assign({}, modelLink) }, props),
        children,
        modals));
};
export default Modals;
//# sourceMappingURL=Modals.js.map