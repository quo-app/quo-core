/*eslint no-unused-vars: 0*/

import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

const FIREBASE_CONNECTION = true;

const config = {
  apiKey: "AIzaSyCOJCrAjbXhyjVF94rUH6GEqoxI0jEuutM",
  authDomain: "quo-app-data.firebaseapp.com",
  projectId: "quo-staging",
};

export const initDatabaseConnection = () => { 
  if(FIREBASE_CONNECTION) firebase.initializeApp(config)
  const database = db();
  database.settings({ timestampsInSnapshots: true});
}

export const db = () => FIREBASE_CONNECTION ? firebase.firestore() : null
