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
const parseConfig = (config) => {
    return config.map((v, i) => {
        const formKey = Object.keys(v)[0];
        const _a = Object.values(v)[0], { component: type, type: elementType } = _a, item = __rest(_a, ["component", "type"]);
        return Object.assign({ type,
            elementType, key: `[formItems_${formKey}_${i}]`, formKey }, item);
    });
};
export default parseConfig;
//# sourceMappingURL=parseConfig.js.map