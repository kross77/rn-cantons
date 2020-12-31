import * as GoogleSignIn from 'expo-google-sign-in';
import createStructuredSelector from "radar/js/createStructuredSelector";
import {createSelector} from "reselect";



const firebaseAuth = async (firebaseApp, idToken) => {
    if(firebaseApp){
        const credential = firebaseApp.auth.GoogleAuthProvider.credential(idToken);
        try{
            let result = await firebaseApp.auth().signInWithCredential(credential);
            console.log('app auth result', result.additionalUserInfo)
        }catch (e) {
            alert(e.message)
        }

    }
}

const googleSignInit = (p) => async (clientId, firebaseApp) => {
    await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId,
    });

    const googleSignInResponseUser = await GoogleSignIn.signInSilentlyAsync();
    p.update('googleSignInResponseUser', googleSignInResponseUser)
    // return await firebaseAuth(firebaseApp, googleSignInResponseUser?.auth?.idToken)
}


const googleSignIn = (p) => {
    return async (firebaseApp) => {
        await GoogleSignIn.askForPlayServicesAsync();
        try{
            const { type, user } = await GoogleSignIn.signInAsync();
            console.log({type, user})
            console.log(user?.auth?.accessToken)

            p.update('googleSignInResponseUser', user)
            await firebaseAuth(firebaseApp, user?.auth?.idToken)
        }catch(e: any){
            alert(e.message)
        }


    }

}
const googleSignOut = (p) => {
    return async (firebase) => {
        await GoogleSignIn.signOutAsync();
        p.update('googleSignInResponseUser', null)
        firebase.auth().signOut()
    }

}
let user = p => p.value.googleSignInResponseUser;
const googleSign = createStructuredSelector({
    init: googleSignInit,
    signIn: googleSignIn,
    signOut: googleSignOut,
    // user,
    fullName: createSelector(
        user,
        (user) => user ? user.displayName : null,
    ),
    avatar: createSelector(
        user,
        (user) => user?.photoURL || null,
    ),
    email: createSelector(
        user,
        (user) => user?.email || null,
    ),
    authorized: createSelector(
        user,
        (user) => !!user,
    ),
})


export default googleSign;
