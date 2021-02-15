import { TouchableOpacity } from "react-native";
import Layout from "@rn-cantons/layout";
import React from "react";
const Content = ({ isOpen, openPopup, height, children }) => (React.createElement(TouchableOpacity, { disabled: isOpen, onPress: openPopup, activeOpacity: 1 },
    React.createElement(Layout, { w: true, h: height, ac: true, white: true, style: { borderTopLeftRadius: 30, borderTopRightRadius: 30 } },
        React.createElement(Layout, { color: '#032237', h: 5, r: 2.5, w: 80, mv: 8 }),
        children)));
export default Content;
//# sourceMappingURL=Content.js.map
