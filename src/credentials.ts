// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC5xtOZCYB4T11MG3Z7hGx9254S9oNLXZ0",
  authDomain: "hibrida-f3241.firebaseapp.com",
  projectId: "hibrida-f3241",
  storageBucket: "hibrida-f3241.firebasestorage.app",
  messagingSenderId: "898656537721",
  appId: "1:898656537721:web:22a94da33087d05b8f18a8",
  measurementId: "G-BY2CFJ2XNP"
};

firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);