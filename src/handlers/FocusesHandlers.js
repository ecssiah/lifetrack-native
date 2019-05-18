import { Alert } from 'react-native'
import { extend } from 'lodash-es'
import { db, auth } from "../config/firebaseConfig"
import { displayTime, getElapsed, getDay } from '../../lib/utils'
import { 
  EXP_PER_SECOND,
  UPDATE_FOCUSES,
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, FOCUSES_KEY, 
} from "../constants/Focuses"
import { UPDATE_STATUS } from "../constants/Status"
import AsyncStorage from '@react-native-community/async-storage';


export function updateFocuses(dispatch, update) {
  dispatch({ type: UPDATE_FOCUSES, update })
}


export async function updateFocusesDB(update) {
  const batch = db.batch()

  for (const id in update) {
    const doc = await db.collection('focuses').doc(id)
    batch.update(doc, update[id])
  }

  batch.commit()
}


export async function updateFocusesLocal(update) {
  try {
    const focusesCollection = await JSON.parse(
      AsyncStorage.getItem(FOCUSES_KEY)
    )

    for (const id in update) {
      const focusDoc = focusesCollection[id]

      extend(focusDoc, update[id])
    }

    AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))
  } catch(e) {
    console.warn(e)
  }
}


export function addFocus(dispatch, id, focus) {
  dispatch({ type: ADD_FOCUS, id, focus })
}


export async function addFocusDB(focus) {
  const doc = await db.collection('focuses').add(focus)

  return doc.id
}


export async function addFocusLocal(focus) {
  try {
    const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
    const focusesCollection = JSON.parse(focusesCollectionRaw)

    const id = new Date().getTime()
    focusesCollection[id] = focus

    AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))

    return id
  } catch(e) {
    console.warn(e)
  }
}


export function deleteFocus(dispatch, id) {
  dispatch({ type: DELETE_FOCUS, id })
}


export async function deleteFocusDB(id) {
  db.collection('focuses').doc(id).delete()
}


export function updateFocus(dispatch, id, update) {
  dispatch({ type: UPDATE_FOCUS, id, update }) 
}


export async function updateFocusDB(id, update) {
  db.collection('focuses').doc(id).update(update)
}


export async function updateFocusCategories(dispatch, name, newName) {
  let query = db.collection('focuses')
  query = query.where('userId', '==', auth.currentUser.uid)
  query = query.where('category', '==', name)

  const update = {}
  const batch = db.batch()

  const querySnapshot = await query.get()

  querySnapshot.forEach(doc => {
    update[doc.id] = { category: newName } 
    batch.update(doc.ref, update[doc.id])
  })

  await batch.commit()
  
  updateFocuses(dispatch, update)
}


export async function updateActiveFocuses(dispatch, activeStart) {
  const querySnapshot = await searchForWorkingFocuses()

  if (!querySnapshot.empty) {
    const elapsed = getElapsed(activeStart)

    requestFocusUpdate(dispatch, querySnapshot, elapsed)

    deactivateFocuses(dispatch, querySnapshot)
  }
}


async function searchForWorkingFocuses() {
  let query = db.collection('focuses')
  query = query.where('userId', '==', auth.currentUser.uid)
  query = query.where('active', '==', true)
  query = query.where('working', '==', true)

  return await query.get()
}


async function deactivateFocuses(dispatch, querySnapshot) { 
  dispatch({ type: UPDATE_STATUS, update: { tracked: 0 } })

  const batch = db.batch()
  const update = { active: false }

  querySnapshot.forEach(doc => batch.update(doc.ref, update))

  batch.commit()

  querySnapshot.forEach(doc => {
    clearInterval(doc.data().timer)
    updateFocus(doc.id, update)
  })
}


function requestFocusUpdate(dispatch, querySnapshot, elapsed) {
  const title = 'Update Experience?'

  let message = ''
  message += 'These focuses have been active \n'
  message += `for ${displayTime(elapsed)} in the background.\n` 
  message += '\n'

  querySnapshot.forEach(doc => message += doc.data().name + '\n')

  message += '\n'
  message += 'Is this correct?'

  Alert.alert(
    title, message,
    [
      { text: 'Cancel', onPress: null },
      { 
        text: 'Confirm', 
        onPress: () => updateExperience(dispatch, querySnapshot, elapsed),
      },
    ],
  )
}


function getUpdatedHistory(doc, elapsed) {
  const history = { ...doc.data().history }
  const elapsedTime = Date.now() + elapsed * 1000
  const today = getDay().toLocaleDateString(
    undefined, { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
  )
  const tomorrow = getDay(1).toLocaleDateString(
    undefined, { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
  )

  if (elapsedTime > tomorrow) {
    const overlapTime = tomorrow - elapsedTime

    history[tomorrow] = overlapTime

    if (history[today]) {
      history[today] += (elapsedTime - overlapTime) / 1000
    } else {
      history[today] = (elapsedTime - overlapTime) / 1000
    }
  } else {
    if (history[today]) {
      history[today] += elapsed
    } else {
      history[today] = elapsed
    }
  }

  return history
}


async function updateExperience(dispatch, querySnapshot, elapsed) {
  const update = {}
  const promises = []
  
  querySnapshot.forEach(doc => {
    const transactionUpdateFunc = async transaction => {
      const docSnapshot = await transaction.get(doc.ref)

      update[docSnapshot.id] = {
        level: docSnapshot.data().level,
        experience: docSnapshot.data().experience + EXP_PER_SECOND * elapsed,
        history: getUpdatedHistory(docSnapshot, elapsed),
      }

      while (update[docSnapshot.id].experience >= 100) {
        update[docSnapshot.id].level++
        update[docSnapshot.id].experience -= 100
      }

      transaction.update(doc.ref, update[docSnapshot.id])
    }

    promises.push(db.runTransaction(transactionUpdateFunc))
  })

  await Promise.all(promises)

  updateFocuses(dispatch, update)
}
