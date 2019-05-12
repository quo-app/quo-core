import { db } from './init';
import { auth } from 'quo-db';

const projects = () => db().collection('projects')

export const getProject = id => {
  const data = {};
  return new Promise(resolve => {
    projects().doc(id).get()
    .then(document => {
      if (document.exists) {
        data[document.id] = document.data();
        resolve(data);
      } else {
        resolve(undefined)
      }
    })
  })
}

export const setProject = (id, data) => {
  return projects().doc(id).set({
    user: auth().currentUser.uid,
    data
  })
}

export const clearAllProjects = () => {
  return projects().get().then(collection => {
    collection.docs.map(doc => {
      projects().doc(doc.id).delete();
    })
  })
}

export const getProjectsOfUser = userId => {
  return new Promise(resolve => {
    projects().where("user", "==", userId).get()
      .then(collection => {
        if (collection.docs.length === 0) resolve([]);
        else {
          const projects = collection.docs.map(doc => ({ id: doc.id, data: doc.data().data }))
          resolve(projects);
        }
      })
  })
}
