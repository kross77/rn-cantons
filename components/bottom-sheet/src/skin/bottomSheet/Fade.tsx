import {TouchableOpacity} from "react-native";
import Animated, {Value} from "react-native-reanimated";
import React from "react";

interface Fade {
    isOpen: boolean
    position: Value<number>
    minimizePopup: () => void
}

const Fade = React.forwardRef(({isOpen, position, minimizePopup}: Fade, ref: any) => {
    return (
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
                backgroundColor: `#032237`
            }}
        >
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
                activeOpacity={0}
                onPress={minimizePopup}
            />

        </Animated.View>
    )
})

export default Fade;
