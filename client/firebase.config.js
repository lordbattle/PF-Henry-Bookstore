// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHWDyKGuQfW18I4SY54QfpBUz0DaH-668",
  authDomain: "bookstore-pf-soyhenry.firebaseapp.com",
  projectId: "bookstore-pf-soyhenry",
  storageBucket: "bookstore-pf-soyhenry.appspot.com",
  messagingSenderId: "319798881497",
  appId: "1:319798881497:web:6d1225b14197a749d822c8",

  // apiKey: process.env.FIREBASE_APIKEY,
  // authDomain: process.env.FIREBASE_AUTHDOMAIN,
  // projectId: process.env.FIREBASE_PROJECTID,
  // storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
