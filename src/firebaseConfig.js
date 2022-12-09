// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeE9k6cOp0fuFFKAjCphQkWBrT3jFi5_I",
  authDomain: "leet-marketplace.firebaseapp.com",
  projectId: "leet-marketplace",
  storageBucket: "leet-marketplace.appspot.com",
  messagingSenderId: "818058646413",
  appId: "1:818058646413:web:85500256bc95d52f6123c4",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
