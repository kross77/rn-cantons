import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import * as React from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import { Image, TouchableOpacity } from "react-native";
import { useUpload } from "../../../panels/SelectPhoto";
import TitleWrapper from "./components/TitleWrapper";
import { useEffect } from "react";
import Block from "@kross77/rn-block/dist";
import Colors from "../../../Colors";
const SelectedPhoto = item => {
    const value = useSpringAnimation(0, item.selected ? 1 : 0, {
        speed: 0.5,
        bounciness: 3,
        delay: 300
    });
    const uploader = useUpload(() => null);
    useEffect(() => {
    }, []);
    return (React.createElement(Layout, { height: 300 },
        React.createElement(TitleWrapper, { title: item.placeholder, value: value },
            React.createElement(Layout, { center: true },
                uploader.localFileUri && (React.createElement(Image, { style: {
                        width: 150,
                        height: 150,
                        borderRadius: 75,
                    }, source: { uri: uploader.localFileUri } })),
                React.createElement(TouchableOpacity, { onPress: () => uploader.selectImage() },
                    React.createElement(Block, { relative: true, width: "auto", pointerEvents: "none" },
                        React.createElement(Tag, { size: 80, icon: "camera", labelType: "h6" }),
                        React.createElement(Block, { absolute: true, left: 25, top: 60 },
                            React.createElement(Tag, { iconBackgroundColor: Colors.POSITIVE, size: 25, scaleFactor: 1, icon: "plus", labelType: "h6" }))),
                    React.createElement(Text, { h4: true }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E"))))));
};
export default SelectedPhoto;
//# sourceMappingURL=SelectedPhoto.js.map