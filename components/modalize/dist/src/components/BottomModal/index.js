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
import { Modalize } from "react-native-modalize";
import React, { useEffect, useRef } from "react";
import { useSingleLink } from "@rn-cantons/react-link";
import { useCombinedRefs } from "../../utils/use-combined-refs";
const withLayout = (Wrapped, link) => (props) => {
    return React.createElement(Wrapped, Object.assign({ onLayout: e => {
            link.set(e.nativeEvent.layout.height);
        } }, props));
};
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
const BottomModal = React.forwardRef((_a, ref) => {
    var { Header, Content, openLink = useSingleLink(false), onClose } = _a, props = __rest(_a, ["Header", "Content", "openLink", "onClose"]);
    const headerLink = useSingleLink(Header ? 1 : 0);
    const contentLink = useSingleLink(0);
    const componentsLink = useSingleLink({
        header: null,
        content: null
    });
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    useEffect(() => {
        componentsLink.set({
            header: withLayout(Header ? Header : () => null, headerLink),
            content: withLayout(Content, contentLink)
        });
    }, [Header, Content]);
    useEffect(() => {
        const current = modalizeRef.current;
        if (openLink.value) {
            current === null || current === void 0 ? void 0 : current.open('top');
        }
        else {
            current === null || current === void 0 ? void 0 : current.close('alwaysOpen');
        }
    }, [openLink.value]);
    const ContentComponent = componentsLink.value.content;
    return (React.createElement(Modalize, Object.assign({ ref: combinedRef, HeaderComponent: componentsLink.value.header, handlePosition: 'inside', onClose: () => {
            openLink.set(false);
            onClose && onClose();
        }, onPositionChange: (pos) => {
            console.log('position', pos);
            const isOpen = !(pos !== 'top');
            openLink.set(isOpen);
        }, alwaysOpen: headerLink.value, modalHeight: contentLink.value + headerLink.value }, props),
        React.createElement(ContentComponent, { headerLink: contentLink })));
});
export default BottomModal;
//# sourceMappingURL=index.js.map