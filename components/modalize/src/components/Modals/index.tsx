import * as React from 'react'
import { useContext, useEffect } from 'react'
import { ArrayLink, useArrayLink, useSingleLink } from '@rn-cantons/react-link'
import BottomModal from '../BottomModal'

export const ModalItem = ({
  openLink = useSingleLink(true),
  children,
  uid,
  ...props
}: any) => {
  const modals = useModals()
  return (
    <BottomModal
      modalStyle={{
        marginHorizontal: 20,
        backgroundColor: '#eee',
      }}
      onClosed={() => {
        !props.Header && modals.remove(uid)
      }}
      openLink={openLink}
      Content={children}
      {...props}
    />
  )
}

export type Index = ArrayLink<React.ComponentType<any & { onLayout: any }>>

export const ModalsContext = React.createContext<any>([])

export const useModals = () => {
  return useContext(ModalsContext)
}

export const UseModals = ModalsContext.Consumer

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const Modals = ({ children, ...props }: any) => {
  const arrayLink = useArrayLink<any>([])
  const childrenLink = useSingleLink([])

  const modelLink: any = {
    ...arrayLink,
    add: (
      item: React.ComponentType<any & { onLayout: (e: any) => void }>,
      props: any,
    ) => {
      const uid = uuidv4()
      arrayLink.add({
        item,
        props: {
          ...props,
          uid,
        },
        uid,
      })
    },
    remove: (uid: string) => {
      const index = arrayLink.value.findIndex((v) => v.uid === uid)
      if (index !== -1) {
        arrayLink.remove(index)
      }
    },
  }

  useEffect(() => {
    if (modelLink.value?.length > childrenLink.value?.length) {
      childrenLink.set(modelLink.value)
    } else {
      setTimeout(() => {
        childrenLink.set(modelLink.value)
      }, 500)
    }
  }, [modelLink.value])

  const modals = childrenLink.value.map(({ item, props }, index) => {
    return (
      <ModalItem key={`modal${index}`} index={index} {...props}>
        {item}
      </ModalItem>
    )
  })
  return (
    <ModalsContext.Provider
      value={{
        ...modelLink,
      }}
      {...props}
    >
      {children}
      {modals}
    </ModalsContext.Provider>
  )
}

export default Modals
