export const reduceObj = (obj, reduceFn) => obj &&
    reduceFn &&
    Object.entries(obj).reduce((reducedObj, [key, item]) => (Object.assign(Object.assign({}, reducedObj), { [key]: reduceFn(item, key) })), {});
export default reduceObj;
//# sourceMappingURL=reduceObj.js.map