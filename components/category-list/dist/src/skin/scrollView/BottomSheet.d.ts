/// <reference types="react" />
import { Animated } from "react-native";
interface BottomSheet {
    hideAnimation: Animated.Value;
    bottomSheet: JSX.Element;
}
declare const BottomSheet: ({ hideAnimation, bottomSheet }: BottomSheet) => JSX.Element;
export default BottomSheet;
