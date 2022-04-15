// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv7efu0Iiu1Wx_ogjZ3zqF271TywZ-r5M",
  authDomain: "my-notes-df0c8.firebaseapp.com",
  projectId: "my-notes-df0c8",
  storageBucket: "my-notes-df0c8.appspot.com",
  messagingSenderId: "927374120275",
  appId: "1:927374120275:web:8caba15f8e80c3ce9cbda6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
