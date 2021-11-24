import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "Your Firebase apiKey",
  authDomain: "Your firebase auth domain",
  projectId: "Project Id",
  storageBucket: "BLah",
  messagingSenderId: "Blah",
  appId: "Blah"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{ auth, provider };

