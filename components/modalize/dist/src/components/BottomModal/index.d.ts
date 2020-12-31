import { ModalizeProps } from "react-native-modalize";
import React from "react";
import { SingleLink } from "@rn-cantons/react-link";
interface BottomModal extends ModalizeProps {
    Header?: React.ComponentType<any & {
        onLayout: Function;
    }>;
    Content: React.ComponentType<any & {
        onLayout: Function;
    }>;
    openLink?: SingleLink<boolean>;
}
declare const BottomModal: React.ForwardRefExoticComponent<BottomModal & React.RefAttributes<unknown>>;
export default BottomModal;
