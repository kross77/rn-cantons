/// <reference types="react" />
import { ScrollViewProps } from "react-native";
import BottomSheet from "./BottomSheet";
import { ScrollViewBottomSheetSkin } from "../skin";
interface ScrollViewBottomSheet extends ScrollViewProps {
    skin: ScrollViewBottomSheetSkin;
    bottomSheet: BottomSheet;
    children: JSX.Element | JSX.Element[];
}
declare const ScrollViewBottomSheet: ({ skin: Skin, children, bottomSheet, ...props }: ScrollViewBottomSheet) => JSX.Element;
export default ScrollViewBottomSheet;
