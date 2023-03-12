// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbuU0CJiLffu_nzpTmFtBhxDA-stc18ik",
  authDomain: "finance-tracker-c4117.firebaseapp.com",
  projectId: "finance-tracker-c4117",
  storageBucket: "finance-tracker-c4117.appspot.com",
  messagingSenderId: "1011107891612",
  appId: "1:1011107891612:web:177ffd8d6aec2205172059",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
