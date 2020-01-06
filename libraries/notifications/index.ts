import firebase from '../firebase'
import env from '../env'

export const setup = () => {
  const messaging = firebase.messaging()
  const firebaseConfig = env('firebase')
  messaging.usePublicVapidKey(firebaseConfig.messagingPublicKey)

  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      console.log('Unable to get permission to notify.')
    }
  })

  console.log('Getting messaging token...')
  messaging
    .getToken()
    .then(currentToken => {
      const currentUser = firebase.auth().currentUser
      if (currentToken && currentUser != null) {
        console.log('Messaging token', currentToken)
        firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({ notificationToken: currentToken })
      } else {
        console.log(
          'No Instance ID token available. Request permission to generate one.',
        )
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token.', err)
    })

  messaging.onMessage(payload => {
    console.log('Message received. ', payload)
    // ...
  })

  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        const userID = firebase.auth().currentUser.uid
        firebase
          .firestore()
          .collection('users')
          .doc(userID)
          .update({ notificationToken: refreshedToken })
      })
      .catch(err => {
        console.error('Unable to retrieve refreshed token ', err)
      })
  })
}
