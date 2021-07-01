export const separateLiteralToProps = (strings: any, ...values: any) => ({
  strings,
  values,
})

export const combineProps = (...values: any[]) =>
  values.reduce(
    (a, b) => ({
      values: a.values.concat(b.values),
      strings: a.strings.concat(b.strings),
    }),
    { strings: [], values: [] },
  )

export const applyProps = (fn: any, props: any) => {
  console.log({ fn, props })
  if (fn) {
    return fn(props.strings, ...props.values)
  }
  return null
}
