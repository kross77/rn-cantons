import {TouchableOpacity} from "react-native";
import Animated, {Value} from "react-native-reanimated";
import React from "react";

interface Fade {
    isOpen: boolean
    position: Value<number>
    minimizePopup: () => void
}

const Fade = React.forwardRef(({isOpen, position, minimizePopup}: Fade, ref: any) => (
    <Animated.View
        ref={ref}
        pointerEvents={isOpen ? 'box-none' : 'none'}
        style={{
            position: "absolute",
            opacity: position.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 0],
            }),
            width: '100%',
            height: '100%',
            backgroundColor: `white`
        }}
    >
        <TouchableOpacity
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255,0,0,0.25)'
            }}
            activeOpacity={1}
            onPress={minimizePopup}
        />

    </Animated.View>
))

export default Fade;
