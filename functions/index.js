const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://lifetrack-27cd1.firebaseio.com'
})

const db = admin.firestore()