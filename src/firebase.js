// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //apiKey: "AIzaSyDQUnjIb1FVTJQS1VIdn57xPQsM4O4aw10", // <-- paste your real key here for test
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// quick runtime check (masked) — safe to leave for debugging, remove in prod if you want
if (typeof window !== "undefined") {
  const k = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "undefined";
  console.log("FIREBASE KEY LOADED:", k === "undefined" ? k : `${k.slice(0,6)}...${k.slice(-4)}`);
}

// Initialize (safe for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
