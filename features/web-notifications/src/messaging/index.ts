import firebase from 'firebase/app'
import 'firebase/messaging'
import { createStructuredSelector } from 'reselect'
import { ObjectLink, useObjectLink } from '@rn-cantons/react-link'
import { Collection } from '@rn-cantons/ts-utils'

interface MessagingState {
  messaging?: firebase.messaging.Messaging
  messages?: firebase.messaging.MessagePayload[]
  token?: string | { error: string } | undefined
  permission: NotificationPermission | 'requesting'
}

export const messagingSelector = createStructuredSelector<any, any>({
  messaging: (link: ObjectLink<MessagingState>) => link.value.messaging,
  messages: (link: ObjectLink<MessagingState>) => link.value.messages,
  token: (link: ObjectLink<MessagingState>) => link.value.token,
  permission: (link: ObjectLink<MessagingState>) => link.value.permission,
  permissionRequesting: (link: ObjectLink<MessagingState>) =>
    link.value.permission === 'requesting',
  permissionGranted: (link: ObjectLink<MessagingState>) =>
    link.value.permission === 'granted',
  init: (link: ObjectLink<MessagingState>) => () => {
    const messaging = firebase.messaging()
    const messages = new Collection<firebase.messaging.MessagePayload>()
    link.update({ messaging })
    return messaging.onMessage((payload: firebase.messaging.MessagePayload) => {
      messages.add(payload)
      link.update({ messages: messages.array })
    })
  },
  requestPermission: (link: ObjectLink<MessagingState>) => () => {
    const { messaging } = link.value
    link.update({ permission: 'requesting' })
    Notification.requestPermission().then((permission) => {
      link.update({ permission })
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        // TODO(developer): Retrieve a registration token for use with FCM.
        // ...
      } else {
        console.log('Unable to get permission to notify.')
      }
    })
  },
  deleteToken: (link: ObjectLink<MessagingState>) => () => {
    const { messaging } = link.value

    // [START messaging_delete_token]
    messaging
      ?.deleteToken()
      .then(() => {
        link.update({ token: undefined, permission: 'default' })
      })
      .catch((err) => {
        link.update({
          token: { error: `Unable to delete token. \n\t ${err.message}` },
        })
      })
  },
  getToken: (link: ObjectLink<MessagingState>) => (vapidKey: string) => {
    const { messaging } = link.value

    // [START messaging_get_token]
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging
      ?.getToken({ vapidKey })
      .then((token) => {
        if (token) {
          link.update({ token })
        } else {
          link.update({
            token: {
              error:
                'No registration token available. Request permission to generate one.',
            },
          })
        }
      })
      .catch((err) => {
        link.update({
          token: {
            error: `An error occurred while retrieving token. \n\t${err.message}`,
          },
        })
      })
  },
})

export const useMessages = () => {
  const messagesLink = useObjectLink<MessagingState>({ permission: 'default' })
  return messagingSelector(messagesLink)
}
