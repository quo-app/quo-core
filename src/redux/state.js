import { createReduxRoot } from 'redux-shrub';

import domain from './domain';
import app from './app';
import ui from './ui';

const getState = (state: State, target: 'domain' | 'ui' | 'app') => {
  //later on, the main root(domain, app, ui) might be pushed
  //deeper in the tree, having to update mapStateToProps on
  //the components might be annoying so use this method instead.
  return state[target]
}

let State = createReduxRoot('root', { domain, app, ui })

const constants = {
  appModes: ['EDIT','PREVIEW'],
}

export { State, constants, getState }
