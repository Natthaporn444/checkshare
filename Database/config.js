import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCf1cG9VbJStYR1Iwqxe7SZbmuul4tvrLk",
  authDomain: "snp-65.firebaseapp.com",
  projectId: "snp-65",
  storageBucket: "snp-65.appspot.com",
  messagingSenderId: "860809096143",
  appId: "1:860809096143:web:6f40a83bf3cf530f4ec0ba",
  measurementId: "G-M8BPVZJ4C9"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

