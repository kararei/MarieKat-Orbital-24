// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzZEvYjyr3jA4eAoz2UCyG0xAYIt3o0fw",
  authDomain: "mariekat-a7cbd.firebaseapp.com",
  projectId: "mariekat-a7cbd",
  storageBucket: "mariekat-a7cbd.appspot.com",
  messagingSenderId: "956490826711",
  appId: "1:956490826711:web:deb1d1e869934e20a64192",
  measurementId: "G-L3YMD3WLND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup };

