import { getState } from 'quo-redux/state';
import messageActions from './messageStack';
import uiActions from './uiSpreader';

const ADD_COMPONENT_ACTION = (payload,domain) => ({
  type:'ADD_COMPONENT_TO_TAB',
  payload:payload,
  domain:domain,
})

const ADD_COMPONENT = (payload) => (dispatch,getFullState) => {
  let domain = getState(getFullState(),'domain');
  dispatch(ADD_COMPONENT_ACTION(payload,domain));
  // dispatch(messageActions.ADD_MESSAGE({type:'status',duration:1500,text:'Added component'}));
}

const COMPONENT_SELECT_ACTION = (component) => ({
  type:'COMPONENT_SELECT',
  payload: component
})

const COMPONENT_SELECT = (component) => (dispatch,getFullState) => {
  dispatch(COMPONENT_SELECT_ACTION(component));
  dispatch(uiActions.UI_COMPONENT_SELECT(component));
}

const ADD_IMAGE_COMPONENT_ACTION = (payload, domain) => ({
  type: 'ADD_IMAGE_COMPONENT_TO_TAB',
  payload: payload,
  domain: domain
});

const ADD_IMAGE_COMPONENT = (payload) => (dispatch, getFullState) => {
  let domain = getState(getFullState(), 'domain');
  dispatch(ADD_IMAGE_COMPONENT_ACTION(payload, domain));
}

export default {
  ADD_COMPONENT,
  ADD_IMAGE_COMPONENT,
  COMPONENT_SELECT,
}
