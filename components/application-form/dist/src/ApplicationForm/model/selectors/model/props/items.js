import itemSelector from "../../item";
const items = (p) => {
    return (p === null || p === void 0 ? void 0 : p.items.map((item) => {
        return itemSelector(p, item);
    })) || [];
};
export default items;
//# sourceMappingURL=items.js.map