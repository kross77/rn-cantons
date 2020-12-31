const itemUpdate = (p, item) => (value) => {
    var _a;
    (_a = p.dataLink) === null || _a === void 0 ? void 0 : _a.update({ [item.formKey]: value });
};
export default itemUpdate;
//# sourceMappingURL=update.js.map