// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: "test-projects-1b921.firebaseapp.com",
  projectId: "test-projects-1b921",
  storageBucket: "test-projects-1b921.appspot.com",
  messagingSenderId: "562691706784",
  appId: "1:562691706784:web:cd427bfe811efaeb645ec5",
  measurementId: "G-GTEBGKG32K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
