import * as React from 'react'
import useErrorBoundary from 'use-error-boundary'


type Content = string | number | { type: string; [key: string]: any }

export const simpleFactory = (
  content: Content,
  globalProps: any,
  components: any[],
) => {
  try {
    if (!Array.isArray(content)) {
      if (typeof content === 'string' && content.indexOf('@') !== -1) {
        content = content.replace(/(@[A-Z,\w-,0-9]*)/g, (match) => {
          const result = globalProps[match.substring(1)] || match
          return result
        })
      }
      return content
    }
    return content.map((child) => {
      if (!child.type) return child
      const { type, id, ...staticProps } = child
      const Component = components[type]
      return (
        <Component {...staticProps}>
          {simpleFactory(staticProps.children, globalProps, components)}
        </Component>
      )
    })
  } catch (e) {
    return null
  }
}

const createDynamicLayout = (components: any[], Text: any) => ({
  children,
  ...props
}: any) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  return (
    <>
      {didCatch ? (
        <Text activeBold>An error has been catched: {error.message}</Text>
      ) : (
        <ErrorBoundary>
          {simpleFactory(children, props, components)}
        </ErrorBoundary>
      )}
    </>
  )
}

export default createDynamicLayout
