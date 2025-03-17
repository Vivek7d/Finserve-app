// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl5lko5y0BhGVTbzf36rFHouZW53XQpiQ",
  authDomain: "union-bank-e2ff1.firebaseapp.com",
  projectId: "union-bank-e2ff1",
  storageBucket: "union-bank-e2ff1.firebasestorage.app",
  messagingSenderId: "138186351322",
  appId: "1:138186351322:web:fd485113937f4e18c5fbe3",
  measurementId: "G-5FKMDJL5LR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
