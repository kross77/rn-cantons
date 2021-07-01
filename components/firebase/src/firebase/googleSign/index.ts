import GoogleSignIn from './components/GoogleSignIn'
import { createSelector, createStructuredSelector } from 'reselect'

const firebaseAuth = async (firebaseApp: any, idToken: string | undefined) => {
  if (firebaseApp) {
    const credential = firebaseApp.auth.GoogleAuthProvider.credential(idToken)
    try {
      await firebaseApp.auth().signInWithCredential(credential)
    } catch (e) {
      alert(e.message)
    }
  }
}

const googleSignInit = (p: any) => async (clientId: string) => {
  await GoogleSignIn.initAsync({
    // You may ommit the clientId when the firebase `googleServicesFile` is configured
    clientId,
  })

  const googleSignInResponseUser = await GoogleSignIn.signInSilentlyAsync()
  p.update('googleSignInResponseUser', googleSignInResponseUser)
}

const googleSignIn = (p: any) => {
  return async (firebaseApp: any) => {
    await GoogleSignIn.askForPlayServicesAsync()
    try {
      const { user } = await GoogleSignIn.signInAsync()
      p.update('googleSignInResponseUser', user)
      await firebaseAuth(firebaseApp, user?.auth?.idToken)
    } catch (e) {
      alert(e.message)
    }
  }
}
const googleSignOut = (p: any) => {
  return async (firebase: any) => {
    await GoogleSignIn.signOutAsync()
    p.update('googleSignInResponseUser', null)
    firebase.auth().signOut()
  }
}
const user = (p: any) => p.value.googleSignInResponseUser
const googleSign = createStructuredSelector({
  init: googleSignInit,
  signIn: googleSignIn,
  signOut: googleSignOut,
  fullName: createSelector(user, (user) => (user ? user.displayName : null)),
  avatar: createSelector(user, (user) => user?.photoURL || null),
  email: createSelector(user, (user) => user?.email || null),
  authorized: createSelector(user, (user) => !!user),
})

export default googleSign
