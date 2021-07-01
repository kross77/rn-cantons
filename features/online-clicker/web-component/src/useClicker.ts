import firebase from 'firebase'
import { useArrayLink, useSingleLink } from '@rn-cantons/react-link'
import 'firebase/firestore'
import React, { useEffect } from 'react'
import { debounce, throttle } from '@rn-cantons/react-utils'
import useConfig from './useConfig'

interface Clicker {
  clicksPropertyName?: string
  clickTableName: string
  settingsTableName: string
}

interface Click {
  date: Date
  user: string
  location?: string
}

interface ReactOnlyProps {
  condition: boolean
  children: React.ReactChildren
  preloader: React.ReactElement | null
}

export const RenderOnly = ({
  condition,
  children,
  preloader = null,
}: ReactOnlyProps) => {
  return condition ? children : preloader
}

const useAnonymousAuth = (): any => {
  const userLink = useSingleLink<any>(null)

  useEffect(() => {
    firebase.auth().signInAnonymously()
    return firebase.auth().onAuthStateChanged((user) => {
      console.log('useAnonymousAuth', { user })
      if (user) {
        userLink.set(user)
      } else {
        userLink.set(undefined)
      }
    })
  }, [])

  return userLink.value
}

const useClicker = (params: Clicker) => {
  const totalClicksLink = useSingleLink(0)
  const timerId = useSingleLink(null)
  const clicksLink = useArrayLink<Click[]>([])
  const user = useAnonymousAuth()

  useEffect(() => {
    if (user?.uid) {
      return firebase
        .firestore()
        .collection(params.settingsTableName)
        .doc(params.clicksPropertyName)
        .onSnapshot((s) => {
          if (s.exists) {
            totalClicksLink.set(s.data()?.value)
          }
        })
    }
  }, [user?.uid])

  useEffect(() => {
    timerId.set({})
  }, [clicksLink.value])

  return {
    total: totalClicksLink.value + clicksLink.value.length,
    couldClick: user?.uid,
    click: () => {
      clicksLink.add({
        user: user?.uid,
        date: new Date(),
      })
    },
  }
}

export default useClicker
