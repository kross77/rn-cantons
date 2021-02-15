type ReduceObjParams = { [key: string]: any }
export const reduceObj = (
  obj: ReduceObjParams,
  reduceFn: (item: any, key: string, currentIndex: number) => any,
  filterFn: (item: any, key: string, currentIndex: number) => boolean = () =>
    true,
): ReduceObjParams =>
  obj &&
  reduceFn &&
  Object.entries(obj).reduce(
    (
      reducedObj: ReduceObjParams,
      [key, item]: any,
      currentIndex,
    ): ReduceObjParams => {
      return filterFn(item, key, currentIndex)
        ? {
            ...reducedObj,
            [key]: reduceFn(item, key, currentIndex),
          }
        : reducedObj
    },
    {},
  )

export default reduceObj
