var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as GoogleSignIn from 'expo-google-sign-in';
import createStructuredSelector from "radar/js/createStructuredSelector";
import { createSelector } from "reselect";
const firebaseAuth = (firebaseApp, idToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (firebaseApp) {
        const credential = firebaseApp.auth.GoogleAuthProvider.credential(idToken);
        try {
            let result = yield firebaseApp.auth().signInWithCredential(credential);
            console.log('app auth result', result.additionalUserInfo);
        }
        catch (e) {
            alert(e.message);
        }
    }
});
const googleSignInit = (p) => (clientId, firebaseApp) => __awaiter(void 0, void 0, void 0, function* () {
    yield GoogleSignIn.initAsync({
        clientId,
    });
    const googleSignInResponseUser = yield GoogleSignIn.signInSilentlyAsync();
    p.update('googleSignInResponseUser', googleSignInResponseUser);
});
const googleSignIn = (p) => {
    return (firebaseApp) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        yield GoogleSignIn.askForPlayServicesAsync();
        try {
            const { type, user } = yield GoogleSignIn.signInAsync();
            console.log({ type, user });
            console.log((_b = (_a = user) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.accessToken);
            p.update('googleSignInResponseUser', user);
            yield firebaseAuth(firebaseApp, (_d = (_c = user) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.idToken);
        }
        catch (e) {
            alert(e.message);
        }
    });
};
const googleSignOut = (p) => {
    return (firebase) => __awaiter(void 0, void 0, void 0, function* () {
        yield GoogleSignIn.signOutAsync();
        p.update('googleSignInResponseUser', null);
        firebase.auth().signOut();
    });
};
let user = p => p.value.googleSignInResponseUser;
const googleSign = createStructuredSelector({
    init: googleSignInit,
    signIn: googleSignIn,
    signOut: googleSignOut,
    fullName: createSelector(user, (user) => user ? user.displayName : null),
    avatar: createSelector(user, (user) => { var _a; return ((_a = user) === null || _a === void 0 ? void 0 : _a.photoURL) || null; }),
    email: createSelector(user, (user) => { var _a; return ((_a = user) === null || _a === void 0 ? void 0 : _a.email) || null; }),
    authorized: createSelector(user, (user) => !!user),
});
export default googleSign;
//# sourceMappingURL=index.js.map