import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEm73XGN-hVEqB847vXKWCt0XZxX2lmgE",
  authDomain: "knobsshop-8f7bd.firebaseapp.com",
  projectId: "knobsshop-8f7bd",
  storageBucket: "knobsshop-8f7bd.firebasestorage.app",
  messagingSenderId: "949732357059",
  appId: "1:949732357059:web:6f6bfc6db04cd0c2658376",
  measurementId: "G-F88H0DGQFY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Export initialized auth

getAnalytics(app); // Optional
