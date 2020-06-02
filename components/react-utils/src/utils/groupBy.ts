/**
 * Groups array by value of defined key
 * @param arr   input array
 * @param key   group key
 */
const groupBy = function (arr: any[], key: string) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default groupBy;
