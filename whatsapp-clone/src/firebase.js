

import firebase from 'firebase/app';
import 'firebase/firestore';
require('firebase/auth')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOfhYERzEmK5zndOAEeIbGAQ-mGtWi8zU",
  authDomain: "whatsapp-clone-c0771.firebaseapp.com",
  projectId: "whatsapp-clone-c0771",
  storageBucket: "whatsapp-clone-c0771.appspot.com",
  messagingSenderId: "1083661334446",
  appId: "1:1083661334446:web:9202a8ee2a44cabfb63a3f",
  measurementId: "G-1WK6BDNL4F"
};

 const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;