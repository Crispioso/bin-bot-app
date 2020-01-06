import firebase from '../firebase'

type LoginDetails = {
  email: string
  password: string
}

const emailCopy = 'crispin.merriman@gmail.com'
const pwCopy = 'daddy loves evelyn'
export const login = ({
  email = emailCopy,
  password = pwCopy,
}: LoginDetails) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.error('Error authing', error)
    })
}

export const onAuthChange = callback => {
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      callback(user)
    } else {
      // User is signed out.
      // ...

      callback()
    }
  })
}
