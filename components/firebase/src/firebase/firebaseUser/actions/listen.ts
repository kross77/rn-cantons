const listen = (p: any) => (firebaseApp: any) => {
  p.update({ firebaseUser: null })
  firebaseApp.auth().onAuthStateChanged((user: any) => {
    if (user) {
      p.update('firebaseUser', user)
    } else {
      p.update('firebaseUser', undefined)
    }
  })
}

export default listen
