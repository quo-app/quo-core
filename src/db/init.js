/*eslint no-unused-vars: 0*/

import firebase from 'firebase/app';
import firestore from 'firebase/firestore';
import 'firebase/auth';

const FIREBASE_CONNECTION = true;
const part1 = 'AIzaSyBpgSJAcI7tI';
const part2 = 'EUS1nSSs6TqE6AMIFTV7pA'
const config = {
  apiKey: part1 + part2,
  authDomain: "quo-staging.firebaseapp.com",
  databaseURL: "https://quo-staging.firebaseio.com",
  projectId: "quo-staging",
  storageBucket: "quo-staging.appspot.com",
  messagingSenderId: "7056679298",
  appId: "1:7056679298:web:453f93efc4f994fb"
};

let AuthProvider;
let Auth;

export const initDatabaseConnection = () => {
  if(!FIREBASE_CONNECTION) return;
  firebase.initializeApp(config)
  const database = db()
  AuthProvider = new firebase.auth.GoogleAuthProvider();
  Auth = firebase.auth();
  auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export const db = () => FIREBASE_CONNECTION ? firebase.firestore() : null
export const provider = () =>  FIREBASE_CONNECTION ? AuthProvider : null;
export const auth = () =>  FIREBASE_CONNECTION ? Auth : null;
