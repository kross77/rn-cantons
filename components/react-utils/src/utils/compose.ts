const compose = (...funcs: Function[]): Function =>
  funcs.reduce(
    (a, b) => (...args: any) => a(b(...args)),
    (arg: any) => arg
  );

export default compose;
