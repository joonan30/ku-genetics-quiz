/**
 * Seed script: uploads questions to Firestore
 *
 * Usage:
 *   1. Add Firebase config to .env
 *   2. npm run seed
 */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { config } from 'dotenv'
import { questions } from './questions.js'

config()

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
  console.log('Clearing existing questions...')
  const existing = await getDocs(collection(db, 'questions'))
  for (const doc of existing.docs) {
    await deleteDoc(doc.ref)
  }

  console.log(`Uploading ${questions.length} questions...`)
  for (const q of questions) {
    await addDoc(collection(db, 'questions'), q)
    process.stdout.write('.')
  }

  console.log(`\n\nDone! ${questions.length} questions uploaded.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
