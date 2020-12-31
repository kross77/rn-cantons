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
import { Animated } from "react-native";
import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import { ScrollViewBottomSheetSkin } from "../skin";
const ScrollViewBottomSheet = (_a) => {
    var { skin: Skin = ScrollViewBottomSheetSkin, children, bottomSheet } = _a, props = __rest(_a, ["skin", "children", "bottomSheet"]);
    const [hideAnimation] = useState(new Animated.Value(0));
    return (React.createElement(Skin.Wrapper, null,
        React.createElement(Skin.ScrollView, Object.assign({ hideHeader: () => {
                Animated.spring(hideAnimation, {
                    toValue: 1,
                    useNativeDriver: true
                }).start();
            }, showHeader: () => {
                setTimeout(() => {
                    Animated.spring(hideAnimation, {
                        toValue: 0,
                        useNativeDriver: true
                    }).start();
                }, 1000);
            } }, props), children),
        React.createElement(Skin.BottomSheet, { hideAnimation: hideAnimation, bottomSheet: React.createElement(BottomSheet, Object.assign({}, bottomSheet)) })));
};
export default ScrollViewBottomSheet;
//# sourceMappingURL=ScrollViewBottomSheet.js.map