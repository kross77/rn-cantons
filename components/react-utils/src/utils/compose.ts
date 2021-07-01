export const compose = (...funcs: any[]): any =>
  funcs.reduce(
    (a, b) => (...args: any) => a(b(...args)),
    (arg: any) => arg,
  )

export default compose
