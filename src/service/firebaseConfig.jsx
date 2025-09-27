// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACWmVivb54TOj438HClGau3r7SIzQ3X0Q",
  authDomain: "web-dev-projects-3a300.firebaseapp.com",
  projectId: "web-dev-projects-3a300",
  storageBucket: "web-dev-projects-3a300.firebasestorage.app",
  messagingSenderId: "720623324336",
  appId: "1:720623324336:web:3c1f2e5f58a3f6d5573f75",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
