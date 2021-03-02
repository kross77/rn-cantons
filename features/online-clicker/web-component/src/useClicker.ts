import firebase from 'firebase'
import { useSingleLink } from '@rn-cantons/react-link'
import 'firebase/firestore'
import { useEffect } from 'react'
import useConfig from './useAdminConfig'

interface Clicker {
  clicksPropertyName: string
  clickTableName: string
  settingsTableName: string
}

interface Click {
  date: Date
  user: string
  location?: string
}

const useAnonymousAuth = (): any => {
  const userLink = useSingleLink<any>(null)

  useEffect(() => {
    firebase.auth().signInAnonymously()
    return firebase.auth().onAuthStateChanged((user) => {
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
  const clicksLink = useSingleLink<Click[]>([])
  const auth = useAnonymousAuth()

  const config = useConfig()

  useEffect(() => {
    console.log({ config })
    if (config) {
      firebase
        .firestore()
        .collection(params.settingsTableName)
        .doc(params.clicksPropertyName)
        .onSnapshot((s) => {
          if (s.exists) {
            totalClicksLink.set(s.data()?.value)
          }
        })
    }
  }, [config])

  return {
    total: totalClicksLink.value,
    couldClick: auth?.user?.uid,
    click: () => {
      clicksLink.value.push({
        user: auth?.user?.uid,
        date: new Date(),
      })
    },
  }
}

export default useClicker
