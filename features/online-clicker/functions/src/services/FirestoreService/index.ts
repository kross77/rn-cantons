import * as admin from 'firebase-admin'
import { uuidv4 } from '@rn-cantons/ts-utils'
import { Click } from '../../types'

export default class FirebaseService {
  clickTableName: string

  settingsTableName: string

  clicksPropertyName: string

  constructor(
    clickTableName: string,
    settingsTableName: string,
    clicksPropertyName = 'clicks',
  ) {
    this.clickTableName = clickTableName
    this.settingsTableName = settingsTableName
    this.clicksPropertyName = clicksPropertyName
  }

  async saveClicks(uid: string, clicks: Click[]) {
    // get, add and save new total count
    await admin.firestore().runTransaction(async (transaction) => {
      const currentValue = await transaction
        .get(
          admin
            .firestore()
            .collection(this.settingsTableName)
            .doc(this.clicksPropertyName),
        )
        .then((s) => {
          return s.exists ? s.data()?.value : 0
        })
      const value = currentValue + clicks.length

      console.log('counter updated', { value })

      await transaction.set(
        admin
          .firestore()
          .collection(this.settingsTableName)
          .doc(this.clicksPropertyName),
        {
          value,
        },
        { merge: true },
      )
    })

    // get, add and save new total count
    await admin.firestore().runTransaction(async (transaction) => {
      const currentValue = await transaction
        .get(admin.firestore().collection('users').doc(uid))
        .then((s): number => {
          if (s.exists) {
            const data = s.data() || {}
            return data[this.clicksPropertyName] as number
          }
          return 0
        })

      const value = currentValue + clicks.length;

      console.log('user count updated', { value })

      await transaction.set(
        admin.firestore().collection('users').doc(uid),
        { [this.clicksPropertyName]: value },
        { merge: true },
      )
    })

    const addClicksBatch = admin.firestore().batch()
    clicks.forEach((click) => {
      addClicksBatch.create(
        admin.firestore().collection(this.clickTableName).doc(uuidv4()),
        click,
      )
    })
    await addClicksBatch.commit()
  }

  async onUserCreate(uid: string) {
    // get and save total count
    await admin.firestore().runTransaction(async (transaction) => {
      const currentValue = await transaction
        .get(admin.firestore().collection(this.settingsTableName).doc('users'))
        .then((s) => {
          return s.exists ? s.data()?.total : 0
        })
      const value = currentValue + 1
      await transaction.set(
        admin.firestore().collection(this.settingsTableName).doc('users'),
        { value },
        { merge: true },
      )
    })

    await admin.firestore().collection(this.clickTableName).add({
      date: new Date(),
      uid,
    })
  }
}
