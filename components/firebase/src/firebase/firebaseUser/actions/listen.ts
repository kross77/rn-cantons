const listen = (p: any) => (firebaseApp: any) => {
  p.update({ firebaseUser: null })
  firebaseApp.auth().onAuthStateChanged((user: any) => {
    console.log('firebase auth event', { user })
    if (user) {
      console.log('firebase update', { user })
      p.update({ firebaseUser: user })
    } else {
      p.update({ firebaseUser: undefined })
    }
  })
}

export default listen
