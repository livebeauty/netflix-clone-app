// Import necessary Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNZzTW8OGaWuc0KqPUh87TTEgrDn54bRo",
  authDomain: "netflix-clone-app-e5cba.firebaseapp.com",
  projectId: "netflix-clone-app-e5cba",
  storageBucket: "netflix-clone-app-e5cba.appspot.com",
  messagingSenderId: "1075821146058",
  appId: "1:1075821146058:web:b43502870facdad4766933",
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
