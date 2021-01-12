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
  velocity,
  velocityThreshold,
  directionalOffset,
  directionalOffsetThreshold,
) {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  )
}

const withSwipe = (WrappedComponent, swipeConfig = defaultConfig) =>
  class extends Component {
    static defaultProps = {
      allowGestureTermination: true,
      swipeDirection: Direction.HORIZONTAL,
      animationX: new Animated.Value(0),
    }

    moveX = new Animated.Value(0)

    onMoveResponder = (_, { dy, dx }) =>
      this.props.onMove &&
      this.props.onMove({
        dx,
        dy,
      })

    _handleShouldSetPanResponder = (evt, gestureState) => {
      return (
        !this.props.disabled &&
        (!this.props.disabledTap || !this._gestureIsClick(gestureState)) &&
        evt.nativeEvent.touches.length === 1
      )
    }

    _onSwipeLeft = (gestureState) => {
      // Animated.spring(this.props.animationX, {
      //   toValue: this.props.animationX.value + 1,
      //   useNativeDriver: true,
      //   speed: 30,
      //   bounciness: 12
      // }).start()
      this.props.onSwipeLeft && this.props.onSwipeLeft(gestureState)
    }

    _onSwipeRight = (gestureState) => {
      // Animated.spring(this.props.animationX, {
      //   toValue: this.props.animationX.value - 1,
      //   useNativeDriver: true,
      //   speed: 30,
      //   bounciness: 12
      // }).start()
      this.props.onSwipeRight && this.props.onSwipeRight(gestureState)
    }

    constructor(props, context) {
      super(props, context)
      this.swipeConfig = Object.assign(swipeConfig, props.config)
    }

    componentWillReceiveProps(props) {
      this.swipeConfig = Object.assign(swipeConfig, props.config)
    }

    componentDidMount() {
      const responderEnd = this._handlePanResponderEnd.bind(this)
      const shouldSetResponder = this._handleShouldSetPanResponder
      this.moveX.addListener()
      this._panResponder = PanResponder.create({
        // stop JS beautify collapse
        onStartShouldSetPanResponder: () => shouldSetResponder,
        onMoveShouldSetPanResponder: () => () => {
          return true
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
          this.props.allowGestureTermination,
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

    _gestureIsClick(gestureState) {
      return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5
    }

    _handlePanResponderEnd(evt, gestureState) {
      const swipeDirection = this._getSwipeDirection(gestureState)
      this._triggerSwipeHandlers(swipeDirection, gestureState)
      // this.props.pan.flattenOffset();
      // Animated.spring(this.moveX, {
      //   toValue: 0,
      //   useNativeDriver: true,
      //   speed: 30,
      //   bounciness: 12
      // }).start()
    }

    _triggerSwipeHandlers(swipeDirection, gestureState) {
      const {
        onSwipe,
        onSwipeUp,
        onSwipeDown,
        onSwipeLeft,
        onSwipeRight,
        onTap,
      } = this.props
      const {
        SWIPE_LEFT,
        SWIPE_RIGHT,
        SWIPE_UP,
        SWIPE_DOWN,
        TAP,
      } = swipeDirections
      onSwipe && onSwipe(swipeDirection, gestureState)
      switch (swipeDirection) {
        case SWIPE_LEFT:
          this._onSwipeLeft(gestureState)
          break
        case SWIPE_RIGHT:
          this._onSwipeRight(gestureState)
          break
        case SWIPE_UP:
          onSwipeUp && onSwipeUp(gestureState)
          break
        case SWIPE_DOWN:
          onSwipeDown && onSwipeDown(gestureState)
          break
        case TAP:
          onTap && onTap(gestureState)
          break
      }
    }

    _getSwipeDirection(gestureState) {
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
      if (this._isValidHorizontalSwipe(gestureState)) {
        return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT
      }
      if (this._isValidVerticalSwipe(gestureState)) {
        return dy > 0 ? SWIPE_DOWN : SWIPE_UP
      }
      return null
    }

    _isValidHorizontalSwipe(gestureState) {
      const { vx, dy } = gestureState
      const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig
      return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold)
    }

    _isValidVerticalSwipe(gestureState) {
      const { vy, dx } = gestureState
      const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig
      return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold)
    }

    render() {
      return (
        <WrappedComponent
          {...(this._panResponder && this._panResponder.panHandlers)}
          {...{ ...this.props }}
        />
      )
    }
  }

export default withSwipe
