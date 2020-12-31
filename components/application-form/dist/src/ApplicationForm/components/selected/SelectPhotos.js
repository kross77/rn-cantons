import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import * as React from "react";
import { useEffect } from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import { Image, TouchableOpacity, View } from "react-native";
import TitleWrapper from "./components/TitleWrapper";
import Block from "@kross77/rn-block/dist";
import Colors from "../../../Colors";
import { FirebaseImageUploaderState, useFirebaseImagesUploader } from "../../../../native/imageUpload/useImageUpload";
import Button from "../../../Button";
import { useArrayLink } from "../../../../utils/linkUtils";
import Icons from "../../../Icons";
export const usePhotosUpload = () => {
    return useFirebaseImagesUploader({
        picker: {
            width: 500,
            height: 500
        }
    });
};
const SelectPhoto = ({ uploader }) => (React.createElement(TouchableOpacity, { style: { height: 250 }, onPress: () => uploader.selectImages() },
    React.createElement(Block, { relative: true, width: "auto", pointerEvents: "none" },
        React.createElement(Tag, { size: 80, icon: "camera", labelType: "h6" }),
        React.createElement(Block, { absolute: true, left: 25, top: 60 },
            React.createElement(Tag, { iconBackgroundColor: Colors.POSITIVE, size: 25, scaleFactor: 1, icon: "plus", labelType: "h6" }))),
    React.createElement(Text, { h4: true }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E"),
    React.createElement(Block, { height: 50 })));
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
        "%"),
    React.createElement(Text, { h4: true },
        "\u0424\u043E\u0442\u043E ",
        uploader.urls.length + 1,
        " \u0438\u0437 ",
        uploader.localFilesUri.length)));
const Img = ({ opacity = 1, size, uri }) => (React.createElement(Image, { style: {
        opacity,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: Colors.B500
    }, source: {
        uri
    } }));
const PhotoFiller = ({ size = 150, uri, progress = 0.5 }) => {
    return (React.createElement(Layout, { relative: true, overflow: "hidden" },
        React.createElement(Block, { overflow: "hidden", absolute: true, bottom: 0, height: size * progress, justify: "flex-end" },
            React.createElement(Img, { size: size, uri: uri })),
        React.createElement(Img, { opacity: 0.5, size: size, uri: uri })));
};
const SelectPhotos = item => {
    var _a, _b;
    const value = useSpringAnimation(0, item.selected ? 1 : 0, {
        speed: 0.5,
        bounciness: 3,
        delay: 300
    });
    const uploader = usePhotosUpload();
    const itemsLink = useArrayLink(item.defaultValue || []);
    useEffect(() => {
        if (uploader.urls && uploader.urls.length > 0) {
            const photos = [...itemsLink.value, ...uploader.urls];
            item.update(photos);
        }
    }, [uploader.urls]);
    useEffect(() => {
        if (uploader.state === FirebaseImageUploaderState.UPLOADED) {
            uploader.clear();
        }
    }, [uploader.state === FirebaseImageUploaderState.UPLOADED]);
    useEffect(() => {
        if (uploader.state === FirebaseImageUploaderState.SELECTED) {
            uploader.confirm();
        }
    }, [uploader.state === FirebaseImageUploaderState.SELECTED]);
    let searched = [];
    const photos = [...itemsLink.value, ...(uploader.localFilesUri || [])];
    const uploadPhotoIndex = ((_a = itemsLink.value) === null || _a === void 0 ? void 0 : _a.length) + ((_b = uploader.urls) === null || _b === void 0 ? void 0 : _b.length);
    return (React.createElement(Layout, { height: 400 },
        React.createElement(TitleWrapper, { size: 1, title: "Фотографии", value: value }, photos && (React.createElement(Layout, { gap: 20, align: "center" },
            React.createElement(Layout, null, photos && photos.length > 0 ? (React.createElement(Layout, { gap: 10 },
                React.createElement(Layout, { row: true, gap: 10, flexWrap: "wrap" }, photos.map((uri, index) => {
                    const isUpload = index < uploadPhotoIndex;
                    const isUploading = index === uploadPhotoIndex;
                    const progress = isUploading
                        ? uploader.progress
                        : isUpload
                            ? 100
                            : 0;
                    return (React.createElement(Layout, { width: 70, height: 80, key: uri, relative: true },
                        React.createElement(PhotoFiller, { uri: uri, progress: progress / 100, size: 70 }),
                        React.createElement(Layout, { absolute: true, bottom: 0, left: 5, align: "center", justify: "center", color: Colors.R600, width: 35, height: 35, borderRadius: 20 },
                            React.createElement(TouchableOpacity, { hitSlop: {
                                    top: 10,
                                    left: 10,
                                    bottom: 10,
                                    right: 10
                                }, onPress: () => {
                                    const items = itemsLink.value;
                                    items.splice(index, 1);
                                    itemsLink.set([...items]);
                                    item.update(itemsLink.value);
                                } },
                                React.createElement(Icons, { color: Colors.W100, size: 20, name: "trash" })))));
                })),
                React.createElement(Button, { onPress: uploader.selectImages }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"))) : (React.createElement(Layout, { width: "100%", align: "center" },
                React.createElement(SelectPhoto, { uploader: uploader })))))))));
};
export default SelectPhotos;
//# sourceMappingURL=SelectPhotos.js.map