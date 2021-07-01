import * as functions from 'firebase-functions'
import FirestoreService from '../services/FirestoreService'

interface CreateClickParams {
  clickTableName: string
  settingsTableName: string
  clicksPropertyName?: string
}

export const createClick = ({
  clicksPropertyName,
  clickTableName,
  settingsTableName,
}: CreateClickParams) => {
  return functions.https.onRequest(
    // @ts-ignore
    createRunClick({
      clicksPropertyName,
      clickTableName,
      settingsTableName,
    }),
  )
}

export const createRunClick = ({
  clicksPropertyName,
  clickTableName,
  settingsTableName,
}: CreateClickParams) => {
  const dbService = new FirestoreService(
    clickTableName,
    settingsTableName,
    clicksPropertyName,
  )
  return async (req: any, res: any) => {
    const { uid, clicks } = req.params;

    console.log('create run click', {uid, clicks});

    await dbService.saveClicks(uid, clicks)
    res.json({ status: 'saved' })
  }
}
