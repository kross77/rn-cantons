import { useSingleLink } from '@rn-cantons/react-link'
import React, { useEffect } from 'react'
import pause  from '../utils/pause'

interface DelayRender {
  children: React.ReactChildren
  pauseTime?: number
}

const DelayRender = ({ children, pauseTime = 0.5 }: DelayRender) => {
  const loadingLink = useSingleLink(true)
  useEffect(() => {
    pause(pauseTime).then(loadingLink.cb(false))
  }, [])
  return loadingLink.value ? null : children
}

export default DelayRender
