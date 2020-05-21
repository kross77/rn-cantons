import ScrollViewWrapper from './Wrapper'
import BottomSheet from './BottomSheet'
import ScrollView from './ScrollView'
import React from "react";

interface ScrollViewBottomSheetSkin {
    Wrapper: React.ComponentType<ScrollViewWrapper>
    ScrollView: React.ComponentType<ScrollView>
    BottomSheet: React.ComponentType<BottomSheet>
}

const ScrollViewBottomSheetSkin: ScrollViewBottomSheetSkin = {
    Wrapper: ScrollViewWrapper,
    ScrollView,
    BottomSheet,
}

export default ScrollViewBottomSheetSkin
