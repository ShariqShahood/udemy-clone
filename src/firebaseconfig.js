// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZ4qITfL9GvQ7fHseiKtIIIeYcAHQTILA",
  authDomain: "udemy-clone-1d8da.firebaseapp.com",
  projectId: "udemy-clone-1d8da",
  storageBucket: "udemy-clone-1d8da.appspot.com",
  messagingSenderId: "756714810372",
  appId: "1:756714810372:web:033eee586df7f60f291951",
  measurementId: "G-JX8EV87RDM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);  // Initialize Firebase Storage
export { db, auth, storage };
