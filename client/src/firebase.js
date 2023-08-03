import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tutorial-98642.firebaseapp.com",
  projectId: "tutorial-98642",
  storageBucket: "tutorial-98642.appspot.com",
  messagingSenderId: "660004257783",
  appId: "1:660004257783:web:55015872b52719cf40b8f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
