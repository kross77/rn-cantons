const listen = (p) => (firebaseApp) => {
    p.update({ firebaseUser: null });
    firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
            p.update('firebaseUser', user);
        }
        else {
            p.update('firebaseUser', undefined);
        }
    });
};
export default listen;
//# sourceMappingURL=listen.js.map