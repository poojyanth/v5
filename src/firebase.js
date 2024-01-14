// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBib1YrTIp_pdclubZcjB4GrEMypB-MiEM",
  authDomain: "fotoflask-66c8a.firebaseapp.com",
  projectId: "fotoflask-66c8a",
  storageBucket: "fotoflask-66c8a.appspot.com",
  messagingSenderId: "501551615169",
  appId: "1:501551615169:web:2e2e55bb044f0012535840",
  measurementId: "G-5B8L6KX021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;