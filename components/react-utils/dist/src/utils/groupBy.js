const groupBy = function (arr, key) {
    return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
export default groupBy;
//# sourceMappingURL=groupBy.js.map