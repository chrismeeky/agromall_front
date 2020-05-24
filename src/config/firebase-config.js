import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2hhCVRrcehhhaRk8VjPJdlSwsaOi84oQ",
  authDomain: "chatta-fb07a.firebaseapp.com",
  databaseURL: "https://chatta-fb07a.firebaseio.com",
  projectId: "chatta-fb07a",
  storageBucket: "chatta-fb07a.appspot.com",
  messagingSenderId: "898134861814",
  appId: "1:898134861814:web:10c556f5b205b93b1dc9d7",
  measurementId: "G-CK6C1JHYZ7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
