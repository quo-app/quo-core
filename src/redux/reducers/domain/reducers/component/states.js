// import { getComponentFromCurrentTab, getCurrentState, PropCompositor } from 'quo-redux/helpers';
import _ from 'lodash';

export const addComponentState = (components, action) => {
  // this is incomplete
  window.alert('adding state to component state');
  // no component specified
  if(!action.payload) return components;

  return components;

}
