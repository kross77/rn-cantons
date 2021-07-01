import ReanimatedBottomSheet from './ReanimatedBottomSheet';
import React from "react";
import Reanimated from "react-native-reanimated";
import { BottomSheetSkin } from "../skin";
class BottomSheet extends React.Component {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.position = new Reanimated.Value(0);
        this.viewRef = React.createRef();
        this.bs = React.createRef();
        this.state = {
            isOpen: false
        };
        this.renderContent = () => {
            const RenderSkin = this.props.skin || BottomSheetSkin;
            return (React.createElement(RenderSkin.Content, { isOpen: this.state.isOpen, openPopup: () => { var _a; return (_a = this.bs.current) === null || _a === void 0 ? void 0 : _a.snapTo(2); }, height: this.props.height }, this.props.children));
        };
    }
    render() {
        const RenderSkin = this.props.skin || BottomSheetSkin;
        return (React.createElement(RenderSkin.Wrapper, { isOpen: this.state.isOpen, fade: React.createElement(RenderSkin.Fade, { isOpen: this.state.isOpen, minimizePopup: () => this.bs.current.snapTo(1), position: this.position }), bottomSheet: React.createElement(ReanimatedBottomSheet, { ref: this.bs, callbackNode: this.position, enabledBottomInitialAnimation: false, snapPoints: [this.props.height, this.props.headerHeight || 80], initialSnap: 1, onOpenStart: () => this.setState({ isOpen: true }), onCloseEnd: () => this.setState({ isOpen: false }), renderContent: this.renderContent }) }));
    }
}
export default BottomSheet;
//# sourceMappingURL=BottomSheet.js.map