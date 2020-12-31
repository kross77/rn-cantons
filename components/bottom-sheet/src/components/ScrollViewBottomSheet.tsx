import { Animated, ScrollViewProps } from 'react-native'
import React, { useState } from 'react'
import BottomSheet from './BottomSheet'
import { ScrollViewBottomSheetSkin } from '../skin'

interface ScrollViewBottomSheet extends ScrollViewProps {
  skin: typeof ScrollViewBottomSheetSkin
  bottomSheet: BottomSheet
  children: JSX.Element | JSX.Element[]
}

const ScrollViewBottomSheet = ({
  skin: Skin = ScrollViewBottomSheetSkin,
  children,
  bottomSheet,
  ...props
}: ScrollViewBottomSheet) => {
  const [hideAnimation] = useState(new Animated.Value(0))
  return (
    <Skin.Wrapper>
      <Skin.ScrollView
        hideHeader={() => {
          Animated.spring(hideAnimation, {
            toValue: 1,
            useNativeDriver: true,
          }).start()
        }}
        showHeader={() => {
          setTimeout(() => {
            Animated.spring(hideAnimation, {
              toValue: 0,
              useNativeDriver: true,
            }).start()
          }, 1000)
        }}
        {...props}
      >
        {children}
      </Skin.ScrollView>
      <Skin.BottomSheet
        hideAnimation={hideAnimation}
        // @ts-ignore
        bottomSheet={<BottomSheet {...bottomSheet} />}
      />
    </Skin.Wrapper>
  )
}
export default ScrollViewBottomSheet
