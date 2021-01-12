import { Dimensions } from 'react-native'
import getDeviceSize from './util/deviceSize'

const labels = ['xs', 'sm', 'md', 'x', 'lg']
const { width, height } = getDeviceSize()

const getSize = (width, height) => {
  return width <= 320 && height < 557
    ? 'xs'
    : width <= 320
    ? 'sm'
    : width <= 375 && height >= 800
    ? 'x'
    : width <= 375
    ? 'md'
    : 'lg'
}

const getDownFrom = (index, values) =>
  (values && values[labels[index]]) ||
  (index <= 0 ? undefined : getDownFrom(index - 1, values))

export const isXS = getSize(width, height) === 'xs'
export const isSM = getSize(width, height) === 'sm'
export const isX = getSize(width, height) === 'x'
export const isMD = getSize(width, height) === 'md'
export const isLG = getSize(width, height) === 'lg'

export default (v, deviceWidth, deviceHeight) => {
  if (typeof v === 'object') {
    const w = deviceWidth || width
    const h = deviceHeight || height
    const size = getSize(w, h)
    const index = labels.findIndex((v) => v === size)
    return getDownFrom(index, v)
  }

  return v
}
