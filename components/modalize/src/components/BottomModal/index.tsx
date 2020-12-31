import { Modalize, ModalizeProps } from 'react-native-modalize'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { SingleLink, useSingleLink } from '@rn-cantons/react-link'
import { useCombinedRefs } from '../../utils/use-combined-refs'

const withLayout = (Wrapped: React.ComponentType, link: any) => (
  props: any,
) => {
  return (
    <Wrapped
      onLayout={(e: any) => {
        // console.log(console.log('e.nativeEvent', e.nativeEvent.layout))
        link.set(e.nativeEvent.layout.height)
      }}
      {...props}
    />
  )
}

interface BottomModal extends ModalizeProps {
  Header?: React.ComponentType<any & { onLayout: Function }>
  Content: React.ComponentType<any & { onLayout: Function }>
  openLink?: SingleLink<boolean>
  onClose?: any
}

// Hook
function usePrevious(value: any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

const BottomModal = React.forwardRef(
  (
    {
      Header,
      Content,
      openLink = useSingleLink<boolean>(false),
      onClose,
      ...props
    }: BottomModal,
    ref: any,
  ) => {
    const headerLink = useSingleLink(Header ? 1 : 0)
    const contentLink = useSingleLink(0)
    const componentsLink = useSingleLink<any>({
      header: null,
      content: null,
    })
    const modalizeRef = useRef(null)
    const combinedRef = useCombinedRefs(ref, modalizeRef)
    useEffect(() => {
      componentsLink.set({
        header: withLayout(Header || (() => null), headerLink),
        content: withLayout(Content, contentLink),
      })
    }, [Header, Content])
    useEffect(() => {
      const { current }: any = modalizeRef
      if (openLink.value) {
        current?.open('top')
      } else {
        current?.close('alwaysOpen')
      }
    }, [openLink.value])

    const ContentComponent = componentsLink.value.content

    return (
      <Modalize
        ref={combinedRef}
        HeaderComponent={componentsLink.value.header}
        handlePosition="inside"
        onClose={() => {
          openLink.set(false)
          onClose && onClose()
        }}
        onPositionChange={(pos) => {
          console.log('position', pos)
          const isOpen = !(pos !== 'top')
          openLink.set(isOpen)
        }}
        alwaysOpen={headerLink.value}
        modalHeight={contentLink.value + headerLink.value}
        {...props}
      >
        <ContentComponent headerLink={contentLink} />
      </Modalize>
    )
  },
)

export default BottomModal
