import { db } from './init';

export const addUser = () => {
  // example db query
  db().collection("users").add({
    first: "Deniz",
    last: "Lovelace",
    born: 1815
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}