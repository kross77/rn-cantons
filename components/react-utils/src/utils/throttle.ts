/**
 * Throttling enforces a maximum number of times a function
 * can be called over time.
 *
 * @param func a function
 * @param wait time
 */
export default function throttle(
  self: any,
  func: (...params: any) => any,
  wait: number,
) {
  let timeout: NodeJS.Timer | number | null = null
  let callbackArgs: any = null
  const context = self

  const later = () => {
    func.apply(context, callbackArgs)
    timeout = null
  }

  return () => {
    if (!timeout) {
      // @ts-ignore
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}
