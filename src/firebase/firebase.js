// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByxt2fZI8wvByYuW2E-LhcWk-oK5ZPFbE",
  authDomain: "vegamovies-fbc26.firebaseapp.com",
  projectId: "vegamovies-fbc26",
  storageBucket: "vegamovies-fbc26.appspot.com",
  messagingSenderId: "551175881368",
  appId: "1:551175881368:web:b3341493bb9a1ecd4e46ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db, "movies")
export const reviewsRef = collection(db, "reviews")
export const usersRef = collection(db, "users")

export default app