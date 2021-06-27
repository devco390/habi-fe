import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCSchj7fZjtIm-6E9nSLjzN3H8pnc_P7hM',
  authDomain: 'habi-fe.firebaseapp.com',
  projectId: 'habi-fe',
  storageBucket: 'habi-fe.appspot.com',
  messagingSenderId: '806269648544',
  appId: '1:806269648544:web:48821239482dc44df913c5'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
