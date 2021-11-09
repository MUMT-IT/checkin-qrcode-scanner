// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {ToastProgrammatic} from "buefy";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCajexJK1Whln4t_4fUIqos8UuzNtWgXo",
  authDomain: "mumt-checkin.firebaseapp.com",
  projectId: "mumt-checkin",
  storageBucket: "mumt-checkin.appspot.com",
  messagingSenderId: "332146410883",
  appId: "1:332146410883:web:4031d9c1956f1eb1f862b6",
  measurementId: "G-D2G1XWWBYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

auth.onAuthStateChanged(user=>{
  if (user) {
    ToastProgrammatic.open({
      message: "You have logged in.",
      type: "is-success"
    })
  } else {
    ToastProgrammatic.open({
      message: "You are not logged in.",
      type: "is-danger"
    })
  }
});

export {
  storage,
  db,
  auth
}

