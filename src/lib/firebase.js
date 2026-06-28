// ============================================
// Firebase auth
// ============================================
// Same auth setup as Nook. Initialize the Firebase app and expose the auth
// instance. Components can use signInWithPopup, onAuthStateChanged, etc.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey:      import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:   import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId:       import.meta.env.VITE_FIREBASE_APP_ID,
};

// Only initialize if env vars exist — keeps dev frictionless
let _app = null;
let _auth = null;

if (config.apiKey) {
  _app = initializeApp(config);
  _auth = getAuth(_app);
}

export const firebaseApp = _app;
export const auth = _auth;
