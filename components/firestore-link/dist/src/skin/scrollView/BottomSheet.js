import { Animated } from "react-native";
import React from "react";
const BottomSheet = ({ hideAnimation, bottomSheet }) => (React.createElement(Animated.View, { pointerEvents: 'box-none', style: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: [{
                translateY: hideAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 80]
                })
            }]
    } }, bottomSheet));
export default BottomSheet;
//# sourceMappingURL=BottomSheet.js.map