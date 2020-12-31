const add = (v) => (item, onClose) => {
    if (onClose) {
        v.update({ items: [...v.value.items, () => ({ item, onClose })] });
    }
    else {
        v.update({ items: [...v.value.items, item] });
    }
};
export default add;
//# sourceMappingURL=add.js.map