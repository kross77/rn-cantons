import React from 'react'
import Content from './Content'
import Fade from './Fade'
import Wrapper from './Wrapper'

interface BottomSheetSkin {
  Content: React.ComponentType<Content>
  Fade: React.ComponentType<Fade>
  Wrapper: React.ComponentType<Wrapper>
  children?: any
}

export const BottomSheetSkin: BottomSheetSkin = {
  Content,
  Fade,
  Wrapper,
}
