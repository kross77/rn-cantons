export const reduceObj = (obj: object, reduceFn: Function): object =>
  obj &&
  reduceFn &&
  Object.entries(obj).reduce(
    (reducedObj: object, [key, item]: any) => ({
      ...reducedObj,
      [key]: reduceFn(item, key),
    }),
    {}
  );

export default reduceObj;
