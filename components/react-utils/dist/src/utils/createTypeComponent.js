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
import React from 'react';
const defineType = (components, props) => {
    const keys = Object.keys(components);
    return (keys.find((key) => props[key] === true || props[key] === 'true') ||
        keys[0]);
};
const getType = (components, props, type) => {
    try {
        return type || defineType(components, props);
    }
    catch (e) {
        console.warn(e.message);
        return type;
    }
};
const _createTypeComponent = (components, typeProp = 'type') => (_a, ref) => {
    var _b = typeProp, type = _a[_b], props = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    type = getType(components, props, type);
    const Component = (components && components[type]) || React.Fragment;
    return React.createElement(Component, Object.assign({ ref: ref }, props));
};
export const createTypeComponent = (components, typeProp = 'type', forward = true) => forward
    ? React.forwardRef(_createTypeComponent(components, typeProp))
    : _createTypeComponent(components, typeProp);
export default createTypeComponent;
//# sourceMappingURL=createTypeComponent.js.map