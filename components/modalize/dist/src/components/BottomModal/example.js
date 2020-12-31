import { useSingleLink } from "@rn-cantons/react-link";
import { Animated, Button, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import Layout from "@rn-cantons/layout";
import BottomModal from "./index";
const BottomModalExample = () => {
    const animatedLink = useSingleLink(new Animated.Value(0));
    const openLink = useSingleLink(false);
    const optionsLink = useSingleLink(false);
    const modalRef = useRef(null);
    const Header = (props) => React.createElement(TouchableOpacity, { activeOpacity: 1, onPress: openLink.cb(true) },
        React.createElement(Layout, Object.assign({ pv: 20, w: true, jc: true, ac: true }, props),
            React.createElement(Animated.Text, null, "Hello")));
    const Content = (props) => React.createElement(Layout, Object.assign({ gap: 10, h: 200, pv: 50, ph: 20, w: true, jc: true }, props),
        React.createElement(Text, null, "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!"),
        React.createElement(Button, { title: 'Open', onPress: () => optionsLink.set(true) }));
    const Options = (props) => React.createElement(Layout, Object.assign({ gap: 10, h: 200, pv: 50, ph: 20, w: true, jc: true }, props),
        React.createElement(Text, null, "This is some options"));
    return React.createElement(Layout, { f1: true, ac: true, jc: true },
        React.createElement(Text, null, openLink.value ? 'Open' : 'Close'),
        React.createElement(Button, { title: 'Open', onPress: () => openLink.set(true) }),
        React.createElement(Button, { title: 'Hide', onPress: () => modalRef.current.close() }),
        React.createElement(Button, { title: 'Show', onPress: () => modalRef.current.open() }),
        React.createElement(BottomModal, { modalStyle: {
                marginHorizontal: 20,
                backgroundColor: '#eee'
            }, openLink: openLink, ref: modalRef, Content: Content, Header: Header, panGestureAnimatedValue: animatedLink.value }),
        React.createElement(BottomModal, { modalStyle: {
                marginHorizontal: 20,
                backgroundColor: '#eee'
            }, openLink: optionsLink, Content: Options }));
};
export default BottomModalExample;
//# sourceMappingURL=example.js.map