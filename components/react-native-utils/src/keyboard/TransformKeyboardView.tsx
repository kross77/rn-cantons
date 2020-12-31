import useKeyboardHeight from "./useKeyboardHeight";
import useSpringAnimation from "../animation/useSpringAnimation";
import {Animated, ViewProps} from "react-native";
import * as React from "react";

const TransformKeyboardView = (props: ViewProps & { keyboadHeight: number, animationConfig: Animated.SpringAnimationConfig }) => {
    const [keyboardHeight, setKeyboardHeight] = useKeyboardHeight();
    const value = useSpringAnimation(0, keyboardHeight, props.animationConfig);
    const propsStyles = props?.style || {}

    return (
        <Animated.View
            {...props}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                paddingTop: keyboardHeight,
                transform: [
                    {
                        translateY: value.interpolate({
                            inputRange: [-1, 0],
                            outputRange: [1, 0]
                        })
                    }
                ]
            }}
        />
    );
};

export default TransformKeyboardView;
