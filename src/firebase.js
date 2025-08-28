// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQUnjIb1FVTJQS1VIdn57xPQsM4O4aw10",
  authDomain: "stacks-56629.firebaseapp.com",
  projectId: "stacks-56629",
  storageBucket: "stacks-56629.firebasestorage.app",
  messagingSenderId: "135309363197",
  appId: "1:135309363197:web:fbab32677a59fa0d913b94",
  measurementId: "G-FMMFNDHCPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (may throw in non-browser environments)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  // analytics initialization can fail in some environments (SSR/test).
  // We silently ignore so the rest of Firebase still works.
  // console.warn("Firebase analytics not initialized:", err);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };
export default app;
