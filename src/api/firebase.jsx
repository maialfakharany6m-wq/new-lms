// src/api/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlGMyk7FD9XmVLDMRIM1hnHmd-XMrMXmA",
  authDomain: "lms-platform-a1973.firebaseapp.com",
  projectId: "lms-platform-a1973",
  storageBucket: "lms-platform-a1973.appspot.com",
  messagingSenderId: "717208730166",
  appId: "1:717208730166:web:a08c56b94d92a0c5403697"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);