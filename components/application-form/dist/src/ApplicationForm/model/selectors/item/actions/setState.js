const setState = (p, item) => (updated) => {
    var _a;
    const current = p.stateLink.value.items[item.formKey];
    (_a = p.stateLink) === null || _a === void 0 ? void 0 : _a.update({ items: Object.assign(Object.assign({}, p.stateLink.value.items), { [item.formKey]: [Object.assign(Object.assign({}, current), updated)] }) });
};
export default setState;
//# sourceMappingURL=setState.js.map