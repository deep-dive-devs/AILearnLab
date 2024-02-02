// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2l1yZoZtvqZwlfIg9S0KE1w_0UyJE1No",
  authDomain: "ailearnlab.firebaseapp.com",
  projectId: "ailearnlab",
  storageBucket: "ailearnlab.appspot.com",
  messagingSenderId: "893004513302",
  appId: "1:893004513302:web:8a3baf40c4537c4ff43537"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);