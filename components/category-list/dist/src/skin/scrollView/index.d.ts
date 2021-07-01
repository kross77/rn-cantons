import ScrollViewWrapper from './Wrapper';
import BottomSheet from './BottomSheet';
import ScrollView from './ScrollView';
import React from "react";
interface ScrollViewBottomSheetSkin {
    Wrapper: React.ComponentType<ScrollViewWrapper>;
    ScrollView: React.ComponentType<ScrollView>;
    BottomSheet: React.ComponentType<BottomSheet>;
}
declare const ScrollViewBottomSheetSkin: ScrollViewBottomSheetSkin;
export default ScrollViewBottomSheetSkin;
