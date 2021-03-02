import { useEffect, useState } from 'react'
import firebase from 'firebase'

const useConfig = () => {
  const [config, setConfig] = useState(null)
  useEffect(() => {
    fetch('/api/сonfig').then(async (result) => {
      const config = await result.json()
      firebase.initializeApp(config)
      setConfig(config)
    })
  }, [])
  return config
}

export default useConfig
