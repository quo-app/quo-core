import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import { getState } from 'quo-redux/state';
import messageActions from './messageStack';
import uiActions from './uiSpreader';

const ADD_COMPONENT_TO_COMPONENTS = (payload) => ({
  type:'ADD_COMPONENT_TO_COMPONENTS',
  payload:payload,
})

const ADD_COMPONENT_TO_TAB = (payload,domain) => ({
  type:'ADD_COMPONENT_TO_TAB',
  payload:payload,
  domain:domain,
})

const COMPONENT_SELECT_ACTION = (component) => ({
  type:'COMPONENT_SELECT',
  payload: component
})

const ADD_IMAGE_COMPONENT_ACTION = (payload, domain) => ({
  type: 'ADD_IMAGE_COMPONENT_TO_TAB',
  payload: payload,
  domain: domain
});

//Recursively adds the children of an component to an array
const traverseAndAdd = (component,components,collector) => {

  //add it to the collector
  collector[component.id] = {...components[component.id]};

  //recursively call it for the children
  let allTheChildren = component.children.map( childID => {
      return traverseAndAdd(components[childID],components,{})
  })

  //merge the collected components
  collector = allTheChildren.reduce(_.merge,collector);

  return collector;

}

const ADD_COMPONENT = (payload) => (dispatch,getFullState) => {
  let domain = getState(getFullState(),'domain');
  // we need to unpack the payload and do some logic here,
  // since the payload will be sent to multiple keys in the
  // store and those need to use the same data;
  let source = domain[payload.source][payload.filetype][payload.page];
  let component = source.components[payload.component.id];

  let newComps = traverseAndAdd(component, source.components, {});

  let rootComponentID;

  //assign new IDs to all the keys.
  let oldIDMappings = {}

  _.forEach(newComps,(o)=>{
      let newID = uuidv1().toUpperCase();
      let oldID = o.id.slice();
      oldIDMappings[oldID] = newID;
      //if it is the root comp, save the id.
      if(o.id === payload.component.id){
          rootComponentID = newID;
      }
      o.id = newID;
      //replace the key
      delete Object.assign(newComps, {[newID]: newComps[oldID] })[oldID]
  })

  //Add the new mappings into newComps
  _.forEach(newComps,(o)=>{
      o.children = o.children.map(child=>{
          return oldIDMappings[child]
      })
  })
  
  dispatch(ADD_COMPONENT_TO_COMPONENTS(newComps));
  dispatch(ADD_COMPONENT_TO_TAB({id: rootComponentID},domain));

  // dispatch(messageActions.ADD_MESSAGE({type:'status',duration:1500,text:'Added component'}));
}

const COMPONENT_SELECT = (component) => (dispatch,getFullState) => {
  dispatch(COMPONENT_SELECT_ACTION(component));
  dispatch(uiActions.UI_COMPONENT_SELECT(component));
}

const ADD_IMAGE_COMPONENT = (payload) => (dispatch, getFullState) => {
  let domain = getState(getFullState(), 'domain');
  dispatch(ADD_IMAGE_COMPONENT_ACTION(payload, domain));
}

export default {
  ADD_COMPONENT,
  ADD_IMAGE_COMPONENT,
  COMPONENT_SELECT,
}
