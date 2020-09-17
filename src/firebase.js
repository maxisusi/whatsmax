import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCootjHw2zBTeKxHEsy-QS_ZzuYDYg7jws",
  authDomain: "whatsmax-fa97f.firebaseapp.com",
  databaseURL: "https://whatsmax-fa97f.firebaseio.com",
  projectId: "whatsmax-fa97f",
  storageBucket: "whatsmax-fa97f.appspot.com",
  messagingSenderId: "929357603014",
  appId: "1:929357603014:web:1f3c738a03c7a6177a77c7",
  measurementId: "G-GENT70MJVV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;