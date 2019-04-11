import { db } from './init';

const previews = () => db().collection('previews');

export const getAllPreviews = () => {
  const data = {};
  return new Promise(resolve => {
    previews().get()
    .then(snapshot => {
      snapshot.forEach(document => {
        data[document.id] = document.data();
      })
      resolve(data);
    })
  })
}

export const getLivePreview = (id, callback) => {
  return new Promise(resolve => {
    previews()
    .doc(id)
    .onSnapshot(doc => callback(doc.data() || {}));
  })
}

export const addToPreviews = (id, data) => {
  return previews().doc(id).set({ data })
}