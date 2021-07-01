import React from "react";
import Reanimated from "react-native-reanimated";
import { BottomSheetSkin } from "../skin";
interface BottomSheet {
    children: JSX.Element | JSX.Element[];
    height: number;
    headerHeight?: number;
    skin?: BottomSheetSkin;
}
interface State {
    isOpen: boolean;
}
declare class BottomSheet extends React.Component<BottomSheet, State> {
    value: number;
    position: Reanimated.Value<0>;
    viewRef: React.RefObject<unknown>;
    bs: any;
    state: {
        isOpen: boolean;
    };
    renderContent: () => JSX.Element;
    render(): JSX.Element;
}
export default BottomSheet;
