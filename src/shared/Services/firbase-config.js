// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBome0WeUawDVGrrdUSdF7rg7oTT7ffsdQ",
  authDomain: "chat-app-ra.firebaseapp.com",
  projectId: "chat-app-ra",
  storageBucket: "chat-app-ra.appspot.com",
  messagingSenderId: "536260961728",
  appId: "1:536260961728:web:501ddde03582133767d425",
  measurementId: "G-9LEL2KXYDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);