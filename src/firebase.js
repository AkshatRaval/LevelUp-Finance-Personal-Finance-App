// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvKZnk_JbtSehIo40VP4o_IASd0eOPlCo",
  authDomain: "levelupfinance-ca735.firebaseapp.com",
  projectId: "levelupfinance-ca735",
  storageBucket: "levelupfinance-ca735.firebasestorage.app",
  messagingSenderId: "719451870641",
  appId: "1:719451870641:web:c4c16d150e0106c8d2d990",
  measurementId: "G-NEZQEKJEXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export correctly
export { auth, db};