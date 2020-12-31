import firebase from "../index";
const listen = (p) => () => {
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
export default listen;
//# sourceMappingURL=listern.js.map