// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  getReactNativePersistence, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup 
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, app, firebaseConfig };
