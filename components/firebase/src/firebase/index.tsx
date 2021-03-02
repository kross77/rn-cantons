import firebase from 'firebase'
import { createStructuredSelector } from 'reselect'
// @ts-ignore
import { ObjectLink } from '@rn-cantons/react-link/dist/useObjectLink'
import { useObjectLink } from '@rn-cantons/react-link'
import { useEffect } from 'react'
import firebaseUser from './firebaseUser'
import initFB from './initFirebase'

interface FirebaseLink {
  initialized: boolean
  user: any
}

export const firebaseSelector = createStructuredSelector<any, any>({
  user: firebaseUser,
  // googleSign,
  init: (link: ObjectLink<FirebaseLink>) => (config: any) => {
    if (!link.value.initialized) {
      initFB(config)
      link.update({ initialized: true })
    }
  },
})

export const useFirebase = (firebase: any) => {
  const stateLink = useObjectLink({firebaseUser: {test: true}})
  const up = stateLink.update
  stateLink.update = (updateParams) => {
    console.log(">>> update: ", updateParams)
    up(updateParams)
  }
  const params = firebaseSelector(stateLink)
  useEffect(() => {
    return params?.user?.listen(firebase)
  }, [])

  return params
}

export * from './callFunction'
export const firebaseApp = firebase
export const initFirebase = initFB

export default firebaseSelector
