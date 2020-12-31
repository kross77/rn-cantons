const replaceVars = (string, props = {}) => {
    return string.replace(/%([a-z,A-Z,0-9]*)%/g, (_, propName) => {
        return props[propName];
    });
};
export default replaceVars;
//# sourceMappingURL=replaceVars.js.map