import admin from 'firebase-admin'

const serviceAccount = require('./firebase-keys.json')

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
} catch (e) {
  console.log('warning: firebase initializeApp')
}

export const firestore = admin.firestore()
