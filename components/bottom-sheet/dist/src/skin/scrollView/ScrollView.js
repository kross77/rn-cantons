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
import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
const ScrollViewSkin = (_a) => {
    var { hideHeader, showHeader } = _a, props = __rest(_a, ["hideHeader", "showHeader"]);
    return (React.createElement(ScrollView, Object.assign({ scrollEventThrottle: 500, onScrollBeginDrag: hideHeader, onScrollEndDrag: showHeader, contentInsetAdjustmentBehavior: "automatic", contentContainerStyle: styles.scrollViewContent, style: styles.scrollView }, props)));
};
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    scrollViewContent: {
        minHeight: '100%',
        paddingBottom: 100
    },
});
export default ScrollViewSkin;
//# sourceMappingURL=ScrollView.js.map