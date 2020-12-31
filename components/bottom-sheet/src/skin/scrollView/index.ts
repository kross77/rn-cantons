import React from 'react'
import ScrollViewWrapper from './Wrapper'
import BottomSheet from './BottomSheet'
import ScrollView from './ScrollView'

interface ScrollViewBottomSheetSkin {
  Wrapper: React.ComponentType<ScrollViewWrapper>
  ScrollView: React.ComponentType<ScrollView>
  BottomSheet: React.ComponentType<BottomSheet>
}

export const ScrollViewBottomSheetSkin: ScrollViewBottomSheetSkin = {
  Wrapper: ScrollViewWrapper,
  ScrollView,
  BottomSheet,
}
