import { Dimensions } from 'react-native'

const labels = ['xs', 'sm', 'md', 'x', 'lg']

const { width, height } = Dimensions.get('window')

const getSize = (width, height) =>
  ((width <= 320 && height < 557) ? 'xs'
    : width < 375 ? 'sm'
      : width <= 375 ? 'md'
        : width <= 376 ? 'x' : 'lg')


export const isXS = getSize(width, height) === 'xs'
export const isX = getSize(width, height) === 'x'
export const isSM = getSize(width, height) === 'sm'
export const isMD = getSize(width, height) === 'md'
export const isLG = getSize(width, height) === 'lg'

const getDownFrom = (index, values) => (values && values[labels[index]]) || (index <= 0 ? undefined : getDownFrom(index - 1, values))

export default (v, deviceWidth, deviceHeight) => {
  if (typeof v === 'object') {
    const w = deviceWidth || width
    const h = deviceHeight || height
    const size = getSize(w, h)
    const index = labels.findIndex(v => v === size)
    return getDownFrom(index, v)
  }

  return v
}
