// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgLMKSLs0yWqauZub_zYOG4jjpiLnAHcU",
  authDomain: "leatheringo.firebaseapp.com",
  projectId: "leatheringo",
  storageBucket: "leatheringo.appspot.com",
  messagingSenderId: "908422133853",
  appId: "1:908422133853:web:a560758d7370d4b02675b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;