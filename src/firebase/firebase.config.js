// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk46eTDtirmKobDMD4xg8Jpfn8sUSMYMs",
  authDomain: "travelbd-158bd.firebaseapp.com",
  projectId: "travelbd-158bd",
  storageBucket: "travelbd-158bd.firebasestorage.app",
  messagingSenderId: "302424997332",
  appId: "1:302424997332:web:ba35c4e057b651d1e42a41",
  measurementId: "G-82S2RM39GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);