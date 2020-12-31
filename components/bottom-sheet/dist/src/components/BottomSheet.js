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
            const openLink = this.getOpenLink();
            return (React.createElement(RenderSkin.Content, { isOpen: openLink === null || openLink === void 0 ? void 0 : openLink.value, openPopup: () => { var _a; return (_a = this.bs.current) === null || _a === void 0 ? void 0 : _a.snapTo(2); }, height: this.props.height }, this.props.children));
        };
        this.getOpenLink = () => this.props.openLink || {
            set: (value) => this.setState({
                isOpen: value,
            }),
            value: this.state.isOpen,
        };
    }
    componentDidMount() {
        var _a, _b;
        if ((_a = this.props.openLink) === null || _a === void 0 ? void 0 : _a.value) {
            (_b = this.bs.current) === null || _b === void 0 ? void 0 : _b.snapTo(2);
        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        var _a, _b, _c;
        if ((_a = this.props.openLink) === null || _a === void 0 ? void 0 : _a.value) {
            (_b = this.bs.current) === null || _b === void 0 ? void 0 : _b.snapTo(2);
        }
        else {
            (_c = this.bs.current) === null || _c === void 0 ? void 0 : _c.snapTo(1);
        }
    }
    render() {
        const RenderSkin = this.props.skin || BottomSheetSkin;
        const openLink = this.getOpenLink();
        return (React.createElement(RenderSkin.Wrapper, { isOpen: openLink.value, fade: React.createElement(RenderSkin.Fade, { isOpen: openLink.value, minimizePopup: () => this.bs.current.snapTo(1), position: this.position }), bottomSheet: React.createElement(ReanimatedBottomSheet, { ref: this.bs, callbackNode: this.position, enabledBottomInitialAnimation: false, snapPoints: [this.props.height, this.props.headerHeight === undefined ? 80 : this.props.headerHeight], initialSnap: 1, onOpenStart: () => openLink.set(true), onCloseEnd: () => openLink.set(false), renderContent: this.renderContent }) }));
    }
}
export default BottomSheet;
//# sourceMappingURL=BottomSheet.js.map