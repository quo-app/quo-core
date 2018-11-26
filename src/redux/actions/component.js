import { getState } from 'quo-redux/state';

import { traverseAndAdd, createNewIds } from 'quo-utils/component';

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

const ADD_COMPONENT = (payload) => (dispatch,getFullState) => {
  let domain = getState(getFullState(), 'domain');

  let source = domain[payload.source][payload.filetype][payload.page];
  let component = source.components[payload.component.id];

  let newComps = traverseAndAdd(component, source.components, {});

  let { components, rootId } = createNewIds({components: newComps, rootId: payload.component.id});

  dispatch(ADD_COMPONENT_TO_COMPONENTS(components));
  dispatch(ADD_COMPONENT_TO_TAB({ id: rootId }, domain));
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
