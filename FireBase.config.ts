// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhuw2NfeimNhkutbYkdPxB5tpdfIQdHnI",
  authDomain: "expoapp-4e1c7.firebaseapp.com",
  projectId: "expoapp-4e1c7",
  storageBucket: "expoapp-4e1c7.firebasestorage.app",
  messagingSenderId: "393986120508",
  appId: "1:393986120508:web:62aa2ff5ba90a1d3d75c39",
  measurementId: "G-M72VC5FHEM"
};

// Initialize Firebase
export   const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);