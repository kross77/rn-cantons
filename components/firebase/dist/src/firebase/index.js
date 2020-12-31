import firebase from 'firebase';
import firebaseUser from './firebaseUser';
import googleSign from './googleSign';
import createStructuredSelector from "radar/js/createStructuredSelector";
export const firebaseSelector = createStructuredSelector({
    firebaseUser,
    googleSign
});
export const firebaseApp = firebase;
export default firebaseSelector;
//# sourceMappingURL=index.js.map