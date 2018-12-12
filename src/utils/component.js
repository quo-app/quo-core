import _ from 'lodash';
import uuid from 'uuid/v1';

//Recursively adds the children of an component to an array
export const traverseAndAdd = (component, components, collector = {}) => {
  //add it to the collector
  collector[component.id] = {...components[component.id]};

  //recursively call it for the children
  let allTheChildren = component.children.map( childID => {
      return traverseAndAdd(components[childID], components)
  })

  //merge the collected components
  collector = allTheChildren.reduce(_.merge, collector);

  return collector;

}

// needs a rootID and an array of components to work on.
// the rootID component must be in the array as well.
// creates copys of the components as well as adding new ids to them.

export const createNewIds = ({ rootID, components }) => {

  let newRootId;
  let oldIDMappings = {};

  components = _.mapValues(components, o => {
    let newID = uuid().toUpperCase();
    let oldID = o.id;
    oldIDMappings[oldID] = newID;

    //if it is the root comp, save the id.
    if(o.id === rootID) {
      newRootId = newID
    };
    o.id = newID;
    //replace the key
    return o
  })

  components = _.mapKeys(components, (o, id) => oldIDMappings[id])

  //Add the new mappings into newComps
  components = _.mapValues(components, o => {
      o.children = o.children.map(child => oldIDMappings[child])
      o.parent = oldIDMappings[o.parent]
      return o
  })

  return { components, rootID: newRootId }
}