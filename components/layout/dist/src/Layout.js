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
import Block from "./Block";
const Layout = (_a) => {
    var { children, wrapper: Wrapper = React.Fragment, wrappers = [], gap = 0 } = _a, props = __rest(_a, ["children", "wrapper", "wrappers", "gap"]);
    return (React.createElement(Block, Object.assign({}, props), Array.isArray(children)
        ? children.map((v, i) => {
            const isLast = i === children.length - 1;
            const wrapper = wrappers[i];
            return (React.createElement(Wrapper, { key: `layout${i}` },
                wrapper ? React.createElement(Block, Object.assign({}, wrapper), v) : v,
                !isLast && React.createElement(Block, { h: gap, w: gap })));
        })
        : children));
};
export default Layout;
//# sourceMappingURL=Layout.js.map