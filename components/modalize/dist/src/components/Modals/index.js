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
import * as React from "react";
import { useContext, useEffect } from "react";
import { useArrayLink, useSingleLink } from "@rn-cantons/react-link";
import BottomModal from "../BottomModal";
export const ModalItem = (_a) => {
    var { openLink = useSingleLink(true), children, uid } = _a, props = __rest(_a, ["openLink", "children", "uid"]);
    const modals = useModals();
    return (React.createElement(BottomModal, Object.assign({ modalStyle: {
            marginHorizontal: 20,
            backgroundColor: '#eee'
        }, onClosed: () => {
            !props.Header && modals.remove(uid);
        }, openLink: openLink, Content: children }, props)));
};
export const ModalsContext = React.createContext([]);
export const useModals = () => {
    return useContext(ModalsContext);
};
export const UseModals = ModalsContext.Consumer;
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const Modals = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const arrayLink = useArrayLink([]);
    const childrenLink = useSingleLink([]);
    const modelLink = Object.assign(Object.assign({}, arrayLink), { add: (item, props) => {
            const uid = uuidv4();
            arrayLink.add({
                item,
                props: Object.assign(Object.assign({}, props), { uid }),
                uid,
            });
        }, remove: (uid) => {
            const index = arrayLink.value.findIndex(v => v.uid === uid);
            if (index !== -1) {
                arrayLink.remove(index);
            }
        } });
    useEffect(() => {
        var _a, _b;
        if (((_a = modelLink.value) === null || _a === void 0 ? void 0 : _a.length) > ((_b = childrenLink.value) === null || _b === void 0 ? void 0 : _b.length)) {
            childrenLink.set(modelLink.value);
        }
        else {
            setTimeout(() => {
                childrenLink.set(modelLink.value);
            }, 500);
        }
    }, [modelLink.value]);
    const modals = childrenLink.value.map(({ item, props }, index) => {
        return (React.createElement(ModalItem, Object.assign({ key: `modal${index}`, index: index }, props), item));
    });
    return (React.createElement(ModalsContext.Provider, Object.assign({ value: Object.assign({}, modelLink) }, props),
        children,
        modals));
};
export default Modals;
//# sourceMappingURL=index.js.map