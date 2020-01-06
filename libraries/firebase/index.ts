import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import env from '../env'

if (!firebase.apps.length) {
  firebase.initializeApp(env('firebase'))
}

export default firebase
