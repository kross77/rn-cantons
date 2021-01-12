import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const DeviceSize = {
  width: width >= 375 ? width : 375,
  height: height >= 667 ? height : 667,
  widthProportion: width / 375,
  heightProportion: height / 375,
  fullHeight: height * (width / 375),
  fullWidth: width * (height / 667),
}
export default DeviceSize
