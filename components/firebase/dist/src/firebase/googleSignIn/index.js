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
const googleSignInit = (clientId) => () => __awaiter(void 0, void 0, void 0, function* () {
    yield GoogleSignIn.initAsync({
        clientId,
    });
});
const googleSignIn = (p) => () => __awaiter(void 0, void 0, void 0, function* () {
    yield GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = yield GoogleSignIn.signInAsync();
    p.update({
        googleSignInResponseType: type,
        googleSignInResponseUser: user,
    });
});
const googleSignOut = (p) => () => __awaiter(void 0, void 0, void 0, function* () {
    yield GoogleSignIn.signOutAsync();
    p.update({
        googleSignInResponseType: null,
        googleSignInResponseUser: null,
    });
});
const googleSign = createStructuredSelector({
    init: googleSignInit,
    signIn: googleSignIn,
    signOut: googleSignOut,
});
export default googleSign;
//# sourceMappingURL=index.js.map