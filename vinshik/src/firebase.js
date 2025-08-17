// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmgTUPe-WzyHwVvdAIFPtVxjFAdwje0rI",
  authDomain: "vinshik-f48b2.firebaseapp.com",
  projectId: "vinshik-f48b2",
  storageBucket: "vinshik-f48b2.firebasestorage.app",
  messagingSenderId: "259058960325",
  appId: "1:259058960325:web:89babda26f4c79d7abadac",
  measurementId: "G-FDCQ4GM1P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);