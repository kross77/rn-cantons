import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { createClick } from './entities/click'
import FirebaseService from './services/FirestoreService'

if (admin.apps.length === 0) {
  admin.initializeApp()
}

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const service = new FirebaseService(
    'navalny_clicks',
    'navalny_clicks_settings',
  )
  await service.onUserCreate(user.uid)
})

export const getConfig = functions.https.onRequest((req, res) => {
  const config = admin.remoteConfig()
  config
    .getTemplate()
    .then((template) => {
      res.json(JSON.parse(template.parameters.webConfig.defaultValue.value))
    })
    .catch((err) => {
      console.error('Unable to get template')
      console.error(err)
    })
})
export const saveClicks = createClick({
  settingsTableName: 'navalny_clicks_settings',
  clickTableName: 'navalny_clicks',
})
