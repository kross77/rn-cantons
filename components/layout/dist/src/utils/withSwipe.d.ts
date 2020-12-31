export namespace swipeDirections {
    export const SWIPE_UP: string;
    export const SWIPE_DOWN: string;
    export const SWIPE_LEFT: string;
    export const SWIPE_RIGHT: string;
    export const TAP: string;
}
export namespace Direction {
    export const HORIZONTAL: string;
    export const VERTICAL: string;
    export const NONE: string;
}
export default withSwipe;
declare function withSwipe(WrappedComponent: any, swipeConfig?: {
    velocityThreshold: number;
    directionalOffsetThreshold: number;
}): {
    new (props: any, context: any): {
        moveX: Animated.Value;
        onMoveResponder: (_: any, { dy, dx }: {
            dy: any;
            dx: any;
        }) => any;
        _handleShouldSetPanResponder: (evt: any, gestureState: any) => boolean;
        _onSwipeLeft: (gestureState: any) => void;
        _onSwipeRight: (gestureState: any) => void;
        swipeConfig: any;
        componentWillReceiveProps(props: any): void;
        componentDidMount(): void;
        _panResponder: import("react-native").PanResponderInstance | undefined;
        _gestureIsClick(gestureState: any): boolean;
        _handlePanResponderEnd(evt: any, gestureState: any): void;
        _triggerSwipeHandlers(swipeDirection: any, gestureState: any): void;
        _getSwipeDirection(gestureState: any): string | null;
        _isValidHorizontalSwipe(gestureState: any): boolean;
        _isValidVerticalSwipe(gestureState: any): boolean;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    defaultProps: {
        allowGestureTermination: boolean;
        swipeDirection: string;
        animationX: Animated.Value;
    };
    contextType?: React.Context<any> | undefined;
};
import { Animated } from "react-native";
import React from "react";
