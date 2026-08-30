// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEm73XGN-hVEqB847vXKWCt0XZxX2lmgE",
  authDomain: "knobsshop-8f7bd.firebaseapp.com",
  projectId: "knobsshop-8f7bd",
  storageBucket: "knobsshop-8f7bd.firebasestorage.app",
  messagingSenderId: "949732357059",
  appId: "1:949732357059:web:6f6bfc6db04cd0c2658376",
  measurementId: "G-F88H0DGQFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);