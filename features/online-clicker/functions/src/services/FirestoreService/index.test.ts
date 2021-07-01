import admin from 'firebase-admin'
import FirestoreService from './index'

admin.initializeApp()
const s = new FirestoreService('navalny', 'navalny-settings')

describe('Firestore service', function () {
  test('few clicks works', async () => {
    await s.saveClicks('test', [
      { date: new Date(), location: '0,0', user: 'test' },
    ])

    await s.saveClicks('test2', [
      { date: new Date(), location: '0,0', user: 'test2' },
      { date: new Date(), location: '0,0', user: 'test2' },
    ])
  }, 15000)
})
