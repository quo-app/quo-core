import { db } from './init';

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
  return projects().doc(id).set({ data })
}