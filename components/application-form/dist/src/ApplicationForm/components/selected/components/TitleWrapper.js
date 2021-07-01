import Layout from "../../../../Layout";
import Block from "@kross77/rn-block/dist";
import Text from "../../../../Text";
import { Animated } from "react-native";
import * as React from "react";
const TitleWrapper = ({ value, size = 1, title, children }) => (React.createElement(Animated.View, { style: {
        opacity: value,
        flex: 1,
        transform: [
            {
                translateY: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0]
                })
            }
        ]
    } },
    React.createElement(Layout, { gap: 40, relative: true, height: "100%" },
        React.createElement(Block, { flex: 0.5, justify: "center" },
            React.createElement(Text, { h4: true },
                title,
                ": ")),
        React.createElement(Block, { flex: size }, children))));
export default TitleWrapper;
//# sourceMappingURL=TitleWrapper.js.map