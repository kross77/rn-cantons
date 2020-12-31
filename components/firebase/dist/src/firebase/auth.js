import createStructuredSelector from "reselect";
import firebase from "./index";
let listern = (p) => {
    p.update({ firebaseUser: null });
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            p.update({ firebaseUser: user });
        }
        else {
            p.update({ firebaseUser: undefined });
        }
    });
};
const authSelector = createStructuredSelector({
    listern,
});
//# sourceMappingURL=auth.js.map