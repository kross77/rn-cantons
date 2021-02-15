// eslint-disable-next-line no-prototype-builtins
const GoogleSignIn = window.hasOwnProperty('__DEV__')
  ? require('expo-google-sign-in')
  : {}

export default GoogleSignIn
