
import { initializeApp } from "firebase/app";
const VITE_FIREBASE_API_KEY="AIzaSyCez9bU-qIFqVxc6c0YjTIrlmGAjDy8zYE"
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4a970.firebaseapp.com",
  projectId: "mern-auth-4a970",
  storageBucket: "mern-auth-4a970.firebasestorage.app",
  messagingSenderId: "195827320854",
  appId: "1:195827320854:web:e2a16d24c6cc3bdbf3cd37"
};
export const app = initializeApp(firebaseConfig);