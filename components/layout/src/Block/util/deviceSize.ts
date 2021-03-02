import {Dimensions} from 'react-native'
const deviceSize = {
  current: Dimensions.get('window'),
  iPhone4: {width: 320, height: 480},
  iPhoneSE: {width: 320, height: 568},
  iPhone8: {width: 375, height: 667},
  iPhonePlus: {width: 414, height: 736},
  iPhoneX: {width: 375, height: 812}
}

const deviceName = 'current'
const currentDevice = process.env.NODE_ENV !== 'development' ? 'current' : deviceName

const getDeviceSize = () => process.env.NODE_ENV !== 'development' ? deviceSize[currentDevice] : deviceSize[currentDevice]

export const isBigger =
  deviceSize[currentDevice].width > deviceSize['current'].width ||
  deviceSize[currentDevice].height > deviceSize['current'].height

export default getDeviceSize
