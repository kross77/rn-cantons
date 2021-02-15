import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const initFirebase = (
  firebaseConfig: { [key: string]: string | number | boolean },
  connectToEmulators = false,
) => {
  if (firebaseConfig) {
    firebase.initializeApp(firebaseConfig)
    const firebaseEmulators: any = {
      auth: {
        host: 'localhost',
        port: 9099,
      },
      database: {
        host: 'localhost',
        port: 9000,
      },
      firestore: {
        host: 'localhost',
        port: 8080,
      },
      functions: {
        host: 'localhost',
        port: 5001,
      },
    }
    if (firebaseEmulators && connectToEmulators) {
      console.log(
        'Automatically connecting Firebase SDKs to running emulators:',
      )
      Object.keys(firebaseEmulators).forEach(function (key) {
        console.log(
          `\t${key}: http://${firebaseEmulators[key].host}:${firebaseEmulators[key].port}`,
        )
      })

      if (
        firebaseEmulators.database &&
        typeof firebase.database === 'function'
      ) {
        firebase
          .database()
          .useEmulator(
            firebaseEmulators.database.host,
            firebaseEmulators.database.port,
          )
      }

      if (
        firebaseEmulators.firestore &&
        typeof firebase.firestore === 'function'
      ) {
        // @ts-ignore
        firebase
          .firestore()
          .useEmulator(
            firebaseEmulators.firestore.host,
            firebaseEmulators.firestore.port,
          )
      }

      if (
        firebaseEmulators.functions &&
        typeof firebase.functions === 'function'
      ) {
        // @ts-ignore
        firebase
          .functions()
          .useEmulator(
            firebaseEmulators.functions.host,
            firebaseEmulators.functions.port,
          )
      }

      if (firebaseEmulators.auth && typeof firebase.auth === 'function') {
        firebase
          .auth()
          .useEmulator(
            `http://${firebaseEmulators.auth.host}:${firebaseEmulators.auth.port}`,
          )
      }
    } else {
      console.log(
        "To automatically connect the Firebase SDKs to running emulators, replace '/__/firebase/init.js' with '/__/firebase/init.js?useEmulator=true' in your index.html",
      )
    }
  }
}

export default initFirebase
