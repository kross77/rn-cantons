import { Value } from "react-native-reanimated";
import React from "react";
interface Fade {
    isOpen: boolean;
    position: Value<number>;
    minimizePopup: () => void;
}
declare const Fade: React.ForwardRefExoticComponent<Fade & React.RefAttributes<unknown>>;
export default Fade;
