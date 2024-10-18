// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQJF19XAYzNkFQHZN847dELT-pr6O-RUI",
  authDomain: "blog-mern-codewave.firebaseapp.com",
  projectId: "blog-mern-codewave",
  storageBucket: "blog-mern-codewave.appspot.com",
  messagingSenderId: "871077187864",
  appId: "1:871077187864:web:8d2eea746433a6d410ce6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);