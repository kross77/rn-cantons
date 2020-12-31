var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import * as React from "react";
import { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useUpload } from "../../../panels/SelectPhoto";
import Block from "@kross77/rn-block/dist";
import Colors from "../../../Colors";
import { useResizing } from "../../../../expo/image/Resize";
import { FirebaseImageUploaderState } from "../../../../native/imageUpload/useImageUpload";
import Button from "../../../Button";
import { useSingleLink } from "../../../../utils/linkUtils";
const SelectPhoto = ({ uploader }) => (React.createElement(TouchableOpacity, { onPress: () => uploader.selectImage() },
    React.createElement(Block, { relative: true, width: "auto", pointerEvents: "none" },
        React.createElement(Tag, { size: 80, icon: "camera", labelType: "h6" }),
        React.createElement(Block, { absolute: true, left: 25, top: 60 },
            React.createElement(Tag, { iconBackgroundColor: Colors.POSITIVE, size: 25, scaleFactor: 1, icon: "plus", labelType: "h6" }))),
    React.createElement(Text, { h4: true }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E")));
const UploadPhoto = ({ uploader }) => (React.createElement(TouchableOpacity, { onPress: () => uploader.confirm() },
    React.createElement(Block, { relative: true, width: "auto", pointerEvents: "none" },
        React.createElement(Tag, { size: 60, icon: "cloud", labelType: "h6" }),
        React.createElement(Block, { absolute: true, left: 17, top: 47 },
            React.createElement(Tag, { iconBackgroundColor: Colors.POSITIVE, size: 15, scaleFactor: 1.3, icon: "arrow-up", labelType: "h6" }))),
    React.createElement(Text, { h4: true }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440")));
const Uploading = ({ uploader }) => (React.createElement(View, null,
    React.createElement(Block, { relative: true, width: "auto", pointerEvents: "none" },
        React.createElement(Tag, { size: 60, icon: "cloud", labelType: "h6" }),
        React.createElement(Block, { absolute: true, left: 17, top: 45 },
            React.createElement(Tag, { iconBackgroundColor: Colors.WARNING, size: 20, scaleFactor: 1.3, icon: "cycle", labelType: "h6" }))),
    React.createElement(Text, { h4: true },
        "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E ",
        uploader.progress,
        "%")));
const SelectedAvatar = item => {
    const uploader = useUpload(() => null);
    const deletedLink = useSingleLink(false);
    useEffect(() => {
        if (uploader.localFileUri) {
            resize(uploader.localFileUri);
        }
    }, [uploader.localFileUri]);
    useEffect(() => {
        if (uploader.state === FirebaseImageUploaderState.SELECTED) {
            uploader.confirm();
        }
    }, [uploader.state === FirebaseImageUploaderState.SELECTED]);
    useEffect(() => {
        if (uploader.state === FirebaseImageUploaderState.UPLOADED) {
            deletedLink.set(false);
        }
    }, [uploader.state === FirebaseImageUploaderState.UPLOADED]);
    useEffect(() => {
        if (uploader.url) {
            item.update(uploader.url);
        }
    }, [uploader.url]);
    const [resize, uri] = useResizing({
        width: 300,
        height: 300,
        quality: 70,
        format: "PNG"
    });
    console.log('SelectedAvatar', uploader);
    const defaultValue = deletedLink.value ? null : item.defaultValue || uploader.url;
    return (React.createElement(Layout, { height: 300 }, defaultValue ? (React.createElement(Layout, { gap: 20, center: true },
        React.createElement(Image, { style: {
                width: 250,
                height: 250,
                borderRadius: 250 / 2,
                backgroundColor: Colors.B500
            }, source: { uri: defaultValue } }),
        React.createElement(Button, { icon: "trash", chevron: false, onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                yield item.update(null);
                deletedLink.set(true);
            }), type: "small" }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"))) : (React.createElement(Layout, { gap: 40, center: true },
        uri && (React.createElement(Image, { style: {
                width: 150,
                height: 150,
                borderRadius: 75
            }, source: { uri } })),
        uploader.state === FirebaseImageUploaderState.UPLOADING ? (React.createElement(Uploading, { uploader: uploader })) : (React.createElement(SelectPhoto, { uploader: uploader }))))));
};
export default SelectedAvatar;
//# sourceMappingURL=Avatar.js.map