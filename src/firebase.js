// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app once (safe with Next.js hot reload / SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth + Firestore exports
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics: only initialize in the browser to avoid SSR errors
export async function getAnalyticsIfAllowed() {
  if (typeof window === "undefined") return null;
  try {
    const { getAnalytics } = await import("firebase/analytics");
    return getAnalytics(app);
  } catch (err) {
    // Analytics may fail in some environments — ignore silently
    return null;
  }
}

export default app;
