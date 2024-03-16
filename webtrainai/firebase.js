// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcNhUfQX0NdaXi7QwNgkR78HErXq8WvjQ",
  authDomain: "trainai-c725c.firebaseapp.com",
  projectId: "trainai-c725c",
  storageBucket: "trainai-c725c.appspot.com",
  messagingSenderId: "855560287586",
  appId: "1:855560287586:web:deeeb92070d0a5bad7283b",
  measurementId: "G-48CEM1JDYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
