import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '')

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
