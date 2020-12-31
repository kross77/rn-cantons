const invariant = (condition, message) => {
    if (!condition) {
        throw new Error(`Invariant Error: ${message}`);
    }
};
export default invariant;
//# sourceMappingURL=invariant.js.map