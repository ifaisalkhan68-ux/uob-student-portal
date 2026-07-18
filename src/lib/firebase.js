import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCX0zcBxVhQ3rC2gXzt9PCKPF6I1nZWiNQ",
  authDomain: "uob-portal.firebaseapp.com",
  projectId: "uob-portal",
  storageBucket: "uob-portal.firebasestorage.app",
  messagingSenderId: "696178120024",
  appId: "1:696178120024:web:4c8bd20d136ee17153012d"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
