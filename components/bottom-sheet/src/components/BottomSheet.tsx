import React from 'react'
import Reanimated from 'react-native-reanimated'
import { SingleLink } from '@rn-cantons/react-link'
import { BottomSheetSkin } from '../skin'
import ReanimatedBottomSheet from './ReanimatedBottomSheet'

interface BottomSheet {
  children: JSX.Element | JSX.Element[]
  height: number
  headerHeight?: number
  skin?: typeof BottomSheetSkin
  openLink?: SingleLink<boolean>
}

interface State {
  isOpen: boolean
}

class BottomSheet extends React.Component<BottomSheet, State> {
  value = 0

  position = new Reanimated.Value(1)

  viewRef = React.createRef()

  bs: any = React.createRef()

  state = {
    isOpen: false,
  }

  renderContent = () => {
    const RenderSkin = this.props.skin || BottomSheetSkin
    const openLink = this.getOpenLink()
      const {children} = this.props;
    return (
      <RenderSkin.Content
        isOpen={openLink?.value}
        openPopup={() => this.bs.current?.snapTo(2)}
        height={this.props.height}
      >
        {children}
      </RenderSkin.Content>
    )
  }

  componentDidMount() {
    if (this.props.openLink?.value) {
      this.bs.current?.snapTo(2)
    }
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    if (this.props.openLink?.value) {
      this.bs.current?.snapTo(2)
    } else {
      this.bs.current?.snapTo(1)
    }
    return true
  }

  getOpenLink = () =>
    this.props.openLink || {
      set: (value) =>
        this.setState({
          isOpen: value,
        }),
      value: this.state.isOpen,
    }

  render() {
    const RenderSkin = this.props.skin || BottomSheetSkin
    const openLink = this.getOpenLink()

    return (
      <RenderSkin.Wrapper
        isOpen={openLink.value}
        fade={
          <RenderSkin.Fade
            isOpen={openLink.value}
            minimizePopup={() => this.bs.current.snapTo(1)}
            position={this.position}
          />
        }
        bottomSheet={
          <ReanimatedBottomSheet
            ref={this.bs}
            callbackNode={this.position}
            enabledBottomInitialAnimation={false}
            snapPoints={[
              this.props.height,
              this.props.headerHeight === undefined
                ? 80
                : this.props.headerHeight,
            ]}
            initialSnap={openLink.value ? 0 : 1}
            onOpenStart={() => openLink.set(true)}
            onCloseEnd={() => openLink.set(false)}
            renderContent={this.renderContent}
          />
        }
      />
    )
  }
}

export default BottomSheet
