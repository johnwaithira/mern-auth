// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4a970.firebaseapp.com",
  projectId: "mern-auth-4a970",
  storageBucket: "mern-auth-4a970.firebasestorage.app",
  messagingSenderId: "195827320854",
  appId: "1:195827320854:web:e2a16d24c6cc3bdbf3cd37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);