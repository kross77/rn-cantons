import ReanimatedBottomSheet from './ReanimatedBottomSheet'
import React from "react";
import Reanimated from "react-native-reanimated";
import {BottomSheetSkin} from "../skin";

interface BottomSheet {
    children: JSX.Element | JSX.Element[]
    height: number
    headerHeight?: number
    skin?: BottomSheetSkin
}


interface State {
    isOpen: boolean
}

class BottomSheet extends React.Component<BottomSheet, State> {
    value = 0;
    position = new Reanimated.Value(0)
    viewRef = React.createRef();
    bs: any = React.createRef();

    state = {
        isOpen: false
    }

    renderContent = () => {
        const RenderSkin = this.props.skin || BottomSheetSkin;
        return (
            <RenderSkin.Content
                isOpen={this.state.isOpen}
                openPopup={() => this.bs.current?.snapTo(2)}
                height={this.props.height}
            >
                {this.props.children}
            </RenderSkin.Content>
        )
    }
    render() {
        const RenderSkin = this.props.skin || BottomSheetSkin;
        return (
            <RenderSkin.Wrapper
                isOpen={this.state.isOpen}
                fade={
                    <RenderSkin.Fade
                        isOpen={this.state.isOpen}
                        minimizePopup={() => this.bs.current.snapTo(1)}
                        position={this.position}
                    />
                }
                bottomSheet={
                    <ReanimatedBottomSheet
                        ref={this.bs}
                        callbackNode={this.position}
                        enabledBottomInitialAnimation={false}
                        snapPoints={[this.props.height, this.props.headerHeight || 80]}
                        initialSnap={1}
                        onOpenStart={() => this.setState({isOpen: true})}
                        onCloseEnd={() => this.setState({isOpen: false})}
                        renderContent={this.renderContent}
                    />
                }
            />
        )
    }
}

export default BottomSheet
