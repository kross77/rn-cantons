import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import React from "react";
const Fade = React.forwardRef(({ isOpen, position, minimizePopup }, ref) => (React.createElement(Animated.View, { ref: ref, pointerEvents: isOpen ? 'box-none' : 'none', style: {
        position: "absolute",
        opacity: position.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 0],
        }),
        width: '100%',
        height: '100%',
        backgroundColor: `#032237`
    } },
    React.createElement(TouchableOpacity, { style: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        }, activeOpacity: 0, onPress: minimizePopup }))));
export default Fade;
//# sourceMappingURL=Fade.js.map