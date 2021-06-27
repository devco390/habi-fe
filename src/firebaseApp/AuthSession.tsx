import firebase from 'firebase/app'
import 'firebase/Auth'

import { USER_LOGIN_STATES } from 'models/login'
import { IUser } from 'models/user'

import { db } from './Client'

const LOCAL_STORAGE_USER_KEY = 'habi-user-data'

export const setLocalStorageUserInfo = (user: IUser | undefined | null) => {
  if (user) {
    localStorage[LOCAL_STORAGE_USER_KEY] = JSON.stringify(user)
  }
}

export const clearLocalStorageUserInfo = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
}

export const getLocalStorageUserInfo = (): IUser | null => {
  return localStorage[LOCAL_STORAGE_USER_KEY] === undefined
    ? null
    : JSON.parse(localStorage[LOCAL_STORAGE_USER_KEY])
}

export const logoutGmail = () => {
  return firebase.auth().signOut()
}

const isLocalStorageSet = (): boolean => {
  return localStorage[LOCAL_STORAGE_USER_KEY] === undefined ? false : true
}

export const onAuthStateChanged = (
  setUser: (user: IUser | null | undefined) => void
) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (!isLocalStorageSet() || user === USER_LOGIN_STATES.NOT_LOGGED) {
      logoutGmail()
      clearLocalStorageUserInfo()
    }

    const normalizedUser = user === null ? null : getLocalStorageUserInfo()

    setUser(normalizedUser)
  })
}

export const loginWithGmail = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(googleProvider)
}

export const findUserByEmail = (userEmail: string) => {
  return db
    .collection('users')
    .where('email', '==', userEmail)
    .where('state', '==', 'active')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        const date = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat('es-CO').format(
          date
        )

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt
        }
      })
    })
}
