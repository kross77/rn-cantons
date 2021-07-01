import { useEffect, useState } from 'react'
import { Keyboard, Dimensions } from 'react-native'

const useKeyboardHeight = () => {
  const { height: h } = Dimensions.get('window')
  const [height, setHeight] = useState(h)
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (e) => setHeight(e.endCoordinates.height),
    )
    const keyboardWillChangeFrame = Keyboard.addListener(
      'keyboardWillChangeFrame',
      (e) => setHeight(e.endCoordinates.height),
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setHeight(0),
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
      keyboardWillChangeFrame.remove()
    }
  }, [])

  return [height as number, setHeight]
}

export default useKeyboardHeight
