import firebase from 'firebase'
import { useState } from 'react'

export const callFunction = (name: string, ...params: any[]) => {
  return firebase.functions().httpsCallable(name)(...params)
}

export const useFunction = (name: string) => {
  const [response, setResponse] = useState<any>(undefined)
  const [error, setError] = useState<any>(undefined)
  return [
    (params: any) => {
      setResponse(null)
      setError(null)
      firebase
        .functions()
        .httpsCallable(name)(params)
        .then(({ data }) => {
          setResponse(data)
        })
        .catch((e) => {
          setResponse(undefined)
          setError(e.message)
        })
    },
    response,
    error,
  ]
}
