/**
 * A function that emits a side effect and does not return anything.
 */
function debounce<T extends Function>(cb: T, wait = 20) {
  let h = 0
  const callable = (...args: any) => {
    clearTimeout(h)
    // @ts-ignore
    h = setTimeout(() => cb(...args), wait)
  }
  return callable
}

export default debounce
