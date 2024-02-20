
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGJ4R2IxOinJmPDzCLVwUGlXZ5oLpFzNE",
  authDomain: "auth-f8d45.firebaseapp.com",
  projectId: "auth-f8d45",
  storageBucket: "auth-f8d45.appspot.com",
  messagingSenderId: "291929436769",
  appId: "1:291929436769:web:9e72dc28fe5eda4d527020",
  measurementId: "G-MEXRRNQ9CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseAuth = getAuth(app);
export default firebaseAuth;