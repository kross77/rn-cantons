import { useEffect, useState } from 'react'
import firebase from 'firebase'

const useConfig = () => {
  const [config, setConfig] = useState<any>(null)
  useEffect(() => {
    fetch('/api/config').then(async (result) => {
      const config = await result.json()
      console.log('useConfig', {config, result})
      firebase.initializeApp(config)
      setConfig(config)
    })
  }, [])
  return config
}

export default useConfig
