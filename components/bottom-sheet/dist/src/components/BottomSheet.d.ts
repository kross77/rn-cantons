import React from "react";
import Reanimated from "react-native-reanimated";
import { BottomSheetSkin } from "../skin";
import { SingleLink } from "@rn-cantons/react-link";
interface BottomSheet {
    children: JSX.Element | JSX.Element[];
    height: number;
    headerHeight?: number;
    skin?: BottomSheetSkin;
    openLink?: SingleLink<boolean>;
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
    componentDidMount(): void;
    getSnapshotBeforeUpdate(prevProps: any, prevState: any): void;
    getOpenLink: () => SingleLink<boolean> | {
        set: (value: boolean) => void;
        value: boolean;
    };
    render(): JSX.Element;
}
export default BottomSheet;
