import Layout from "@rn-cantons/layout";
import { Button, Text } from "react-native";
import React from "react";
import Modals, { UseModals } from "./index";
import { useSingleLink } from "@rn-cantons/react-link";
const ModalsExample = () => {
    const Content = (props) => React.createElement(Layout, Object.assign({ gap: 10, h: 200, pv: 50, ph: 20, w: true, jc: true }, props),
        React.createElement(Text, null, "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with every layout! Configure above, then get yer pirate ipsum...own the high seas, arg!"));
    const Header = (props) => React.createElement(Layout, Object.assign({ gap: 10, h: 100, w: true, jc: true }, props),
        React.createElement(Text, null, "Header"));
    const openLink = useSingleLink(false);
    return (React.createElement(Modals, null,
        React.createElement(Layout, { f1: true, ac: true, jc: true },
            React.createElement(UseModals, null, modals => (React.createElement(Layout, null,
                React.createElement(Text, null, modals.value.length),
                React.createElement(Button, { title: 'Open', onPress: () => modals.add(Content) })))))));
};
export default ModalsExample;
//# sourceMappingURL=example.js.map