var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Text from "../../../Text";
import * as React from "react";
import { ActivityIndicator, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../../../Layout";
import urlQueryToFirestoreCollection, { getCollectionParams } from "../../../../utils/firestore/urlQueryToFirestoreCollection";
import useFirebaseUser from "../../../../firebase/auth/useFirebaseUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firestore from "@react-native-firebase/firestore";
import ApplicationFrom from "../../index";
import Block from "@kross77/rn-block/dist";
import Animation from "../../../Animation";
import { useSingleLink } from "../../../../utils/linkUtils";
import { useEffect } from "react";
import Colors from "../../../Colors";
import Tag from "../../../Tag";
import useDeviceSize from "../../../../native/useDeviceSize";
const DelayedRender = ({ children, delay = 200 }) => {
    const render = useSingleLink(false);
    useEffect(() => {
        setTimeout(() => render.set(true), delay);
    }, []);
    return render.value ? children : null;
};
const Preview = ({ item, size = 60 }) => React.createElement(Image, { style: { borderRadius: size / 2, backgroundColor: Colors.B800, width: size, height: size }, source: { uri: (item.photos && item.photos[0]) || "https://www.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png" } });
const SelectedList = (props) => {
    var _a;
    const user = useFirebaseUser();
    const params = {
        userId: (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.uid
    };
    const collectionParams = getCollectionParams(props.collection, params);
    const collection = urlQueryToFirestoreCollection(props.collection, params);
    const [items, loading] = useCollectionData(collection, { idField: "id" });
    const add = (value) => firestore().collection(collectionParams.fieldPath).add(value);
    const update = (_a) => {
        var { id } = _a, updated = __rest(_a, ["id"]);
        return firestore().collection(collectionParams.fieldPath).doc(id).set(updated, { merge: true });
    };
    const remove = (id) => firestore().collection(collectionParams.fieldPath).doc(id).delete();
    const reset = () => firestore().collection('forms').doc('developer').set({ [props.newReference]: undefined }, { merge: true });
    const openNew = useSingleLink(false);
    const newEditing = useSingleLink(false);
    const size = useDeviceSize();
    return (React.createElement(DelayedRender, null,
        React.createElement(Animation, { relative: true, type: "twoLayers", popupTopMagin: "0%", openned: openNew.value },
            React.createElement(Layout, { center: true },
                React.createElement(ScrollView, { showsHorizontalScrollIndicator: false, directionalLockEnabled: true },
                    React.createElement(Layout, { gap: 10, minHeight: size.height - 100, justify: 'center' }, loading ? React.createElement(ActivityIndicator, null) :
                        items.map(item => React.createElement(Layout, { alignItems: 'center', width: size.width - 20, row: true, gap: 15 },
                            React.createElement(Preview, { item: item, size: 70 }),
                            React.createElement(Layout, { width: 'auto', gap: 5, align: 'flex-start' },
                                React.createElement(Text, { h6: true, align: 'left' }, item.carModel),
                                React.createElement(Text, { h7: true, align: 'left' }, item.number)),
                            React.createElement(Block, { flex: 1 }),
                            React.createElement(Block, { width: 40, height: 40, relative: true, top: 5, right: 5 },
                                React.createElement(Tag, { onPress: () => remove(item.id), icon: 'trash' }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))))),
                React.createElement(Layout, { gap: 10, pv: 40 },
                    React.createElement(TouchableOpacity, { onPress: () => openNew.set(true) },
                        React.createElement(Block, { pointerEvents: 'none' },
                            React.createElement(Block, { width: 'auto', absolute: true, left: -60, top: -19 },
                                React.createElement(Tag, { iconBackgroundColor: Colors.TRANSPARENT, iconColor: Colors.B800, size: 80, icon: 'plus' })),
                            React.createElement(Button, { color: Colors.B800, title: 'Добавить' }))))),
            React.createElement(Layout, { center: true },
                React.createElement(Block, { zIndex: 1 }, openNew.value && React.createElement(DelayedRender, { delay: 50 },
                    React.createElement(ApplicationFrom, { onClose: () => openNew.set(false), onChangeOpenState: newEditing.set, animation: { popupTopMagin: "0%" }, name: props.newReference }))),
                React.createElement(Block, { zIndex: newEditing.value ? 0 : 2, absolute: true, bottom: 30 },
                    React.createElement(Button, { color: Colors.B800, onPress: () => openNew.set(false), title: 'Закрыть' }))))));
};
export default SelectedList;
//# sourceMappingURL=SelectedList.js.map