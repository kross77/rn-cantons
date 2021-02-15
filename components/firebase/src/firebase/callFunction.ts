import firebase from 'firebase'
import { useState } from 'react'

export const callFunction = (name: string, ...params: any[]) => {
  return firebase.functions().httpsCallable(name)(...params)
}

export const useFunction = (name: string) => {
  const [response, setResponse] = useState<any>(undefined)
  return [
    (params: any) => {
      setResponse(null)
      firebase
        .functions()
        .httpsCallable(name)(params)
        .then(({ data }) => {
          setResponse(data)
        })
    },
    response,
  ]
}
