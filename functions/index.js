const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://lifetrack-27cd1.firebaseio.com'
})

const db = admin.firestore()

function getToday() {
  const d = new Date()

  return d.setUTCHours(0, 0, 0, 0)
}

function getUserData(values) {
  const statsQuery = values[0]
  const focusesQuery = values[1]

  const data = {
    stats: {},
    focuses: {},
  }

  statsQuery.forEach(doc => {
    data.stats[doc.id] = doc.data()
  })

  focusesQuery.forEach(doc => {
    data.focuses[doc.id] = doc.data()
  })

  return data
}

function handleUserData(values) {
  const date = getToday()
  const data = getUserData(values)



  return data.focuses
}

exports.updateHistory = functions.https.onRequest((req, res) => {
  Promise.all([
    db.collection('stats').get(),
    db.collection('focuses').get(),
  ]).then(values => {
    const data = handleUserData(values)

    res.status(200).send(data)
  }).catch(error => {
    res.status(404).send(error)
  })
})
