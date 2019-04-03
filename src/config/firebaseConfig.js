import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const firebaseConfig = {
  apiKey: "AIzaSyBtklAJ3LniqGDapAvQ5NoPUN58TwNpjYQ",
  authDomain: "lifetrack-27cd1.firebaseapp.com",
  databaseURL: "https://lifetrack-27cd1.firebaseio.com",
  projectId: "lifetrack-27cd1",
  storageBucket: "lifetrack-27cd1.appspot.com",
  messagingSenderId: "396651915566",
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()