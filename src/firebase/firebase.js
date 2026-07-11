import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDie8nwQfqnwWG0vFSGoqYCYRFWBmKjhkk",
  authDomain: "paradise-sweets-academy.firebaseapp.com",
  projectId: "paradise-sweets-academy",
  storageBucket: "paradise-sweets-academy.firebasestorage.app",
  messagingSenderId: "428275137528",
  appId: "1:428275137528:web:d64cbead8a23d47131b40d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;