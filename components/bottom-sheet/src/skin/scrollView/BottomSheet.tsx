import {Animated} from "react-native";
import React from "react";

interface BottomSheet {
    hideAnimation: Animated.Value
    bottomSheet: JSX.Element
}

const BottomSheet = ({hideAnimation, bottomSheet}: BottomSheet) => (
    <Animated.View pointerEvents={'box-none'} style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: [{
            translateY: hideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 80]
            })
        }]
    }}>
        {bottomSheet}
    </Animated.View>
)

export default BottomSheet;
