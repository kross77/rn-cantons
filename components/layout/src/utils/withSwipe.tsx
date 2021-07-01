import React, { Component } from 'react'
import { Animated, PanResponder } from 'react-native'
import DeviceSize from './size/deviceScaledSize'

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  TAP: 'TAP',
}

export const Direction = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
  NONE: 'NONE',
}

const defaultConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 30,
}

function isValidSwipe(
  velocity: number,
  velocityThreshold: number,
  directionalOffset: number,
  directionalOffsetThreshold: number,
) {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  )
}

const withSwipe = (
  WrappedComponent: React.ComponentType<any>,
  swipeConfig = defaultConfig,
) =>
  class extends Component<any, any> {
    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
      allowGestureTermination: true,
      swipeDirection: Direction.HORIZONTAL,
      animationX: new Animated.Value(0),
    }

    swipeConfig: any = null

    panResponder: any = null

    moveX = new Animated.Value(0)

    constructor(props: any, context: any) {
      super(props, context)
      this.swipeConfig = Object.assign(swipeConfig, props.config)
    }

    componentDidMount() {
      const responderEnd = this.handlePanResponderEnd.bind(this)
      const shouldSetResponder: any = this.handleShouldSetPanResponder

      this.panResponder = PanResponder.create({
        // stop JS beautify collapse
        onStartShouldSetPanResponder: () => shouldSetResponder,
        onMoveShouldSetPanResponder: () => {
          return true
        },
        onPanResponderTerminationRequest: (evt, gestureState) => {
          const { allowGestureTermination } = this.props
          return allowGestureTermination
        },
        onPanResponderMove: (evt, { dx, dy }) => {
          const { swipeDirection } = this.props

          if (swipeDirection === Direction.HORIZONTAL) {
            this.moveX.setValue(dx)
          }

          if (swipeDirection === Direction.VERTICAL) {
            this.moveX.setValue(dy / DeviceSize.height)
          }
        },
        onPanResponderRelease: responderEnd,
        onPanResponderTerminate: responderEnd,
      })
    }

    getSnapshotBeforeUpdate(
      prevProps: Readonly<any>,
      prevState: Readonly<any>,
    ): any | null {
      const { config } = this.props
      this.swipeConfig = Object.assign(swipeConfig, config)
    }

    onMoveResponder = (_: any, { dy, dx }: any) => {
      const { onMove } = this.props
      if (onMove) {
        onMove({
          dx,
          dy,
        })
      }
    }

    getSwipeDirection(gestureState: any) {
      const {
        SWIPE_LEFT,
        SWIPE_RIGHT,
        SWIPE_UP,
        SWIPE_DOWN,
        TAP,
      } = swipeDirections
      const { dx, dy } = gestureState
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
        return TAP
      }
      if (this.isValidHorizontalSwipe(gestureState)) {
        return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT
      }
      if (this.isValidVerticalSwipe(gestureState)) {
        return dy > 0 ? SWIPE_DOWN : SWIPE_UP
      }
      return null
    }

    handleShouldSetPanResponder = (evt: any, gestureState: any) => {
      const { disabled, disabledTap } = this.props
      return (
        !disabled &&
        (!disabledTap || !this.gestureIsClick(gestureState)) &&
        evt.nativeEvent.touches.length === 1
      )
    }

    onSwipeLeft = (gestureState: any) => {
      const { onSwipeLeft } = this.props

      if (onSwipeLeft) {
        onSwipeLeft(gestureState)
      }
    }

    onSwipeRight = (gestureState: any) => {
      const { onSwipeRight } = this.props
      if (onSwipeRight) {
        onSwipeRight(gestureState)
      }
    }

    // eslint-disable-next-line class-methods-use-this
    gestureIsClick(gestureState: any) {
      return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5
    }

    handlePanResponderEnd(evt: any, gestureState: any) {
      const swipeDirection = this.getSwipeDirection(gestureState)
      this.triggerSwipeHandlers(swipeDirection, gestureState)
      // this.props.pan.flattenOffset();
      // Animated.spring(this.moveX, {
      //   toValue: 0,
      //   useNativeDriver: true,
      //   speed: 30,
      //   bounciness: 12
      // }).start()
    }

    triggerSwipeHandlers(swipeDirection: any, gestureState: any) {
      const { onSwipe, onSwipeUp, onSwipeDown, onTap } = this.props
      const {
        SWIPE_LEFT,
        SWIPE_RIGHT,
        SWIPE_UP,
        SWIPE_DOWN,
        TAP,
      } = swipeDirections
      if (onSwipe) {
        onSwipe(swipeDirection, gestureState)
      }
      // eslint-disable-next-line default-case
      switch (swipeDirection) {
        case SWIPE_LEFT:
          this.onSwipeLeft(gestureState)
          break
        case SWIPE_RIGHT:
          this.onSwipeRight(gestureState)
          break
        case SWIPE_UP: {
          if (onSwipeUp) {
            onSwipeUp(gestureState)
          }
          break
        }
        case SWIPE_DOWN: {
          if (onSwipeDown) {
            onSwipeDown(gestureState)
          }
          break
        }
        case TAP: {
          if (onTap) {
            onTap(gestureState)
          }
          break
        }
      }
    }

    isValidHorizontalSwipe(gestureState: any) {
      const { vx, dy } = gestureState
      const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig
      return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold)
    }

    isValidVerticalSwipe(gestureState: any) {
      const { vy, dx } = gestureState
      const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig
      return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold)
    }

    render() {
      return (
        <WrappedComponent
          {...(this.panResponder && this.panResponder.panHandlers)}
          {...{ ...this.props }}
        />
      )
    }
  }

export default withSwipe
