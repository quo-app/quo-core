import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createReduxRoot } from 'redux-shrub';
import { editorReducer } from './reducer';

const composeEnhancer = compose;

export const editorStore = () => createStore(
  editorReducer,
  composeEnhancer(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { Immutable }})),
);

export const createReduxStructure = (reducers = {}) => {
  const reduxShrubInstance = createReduxRoot('root', reducers);
  const reduxReducers = reduxShrubInstance._createMainReducer();

  const store = createStore(
    reduxReducers,
    composeEnhancer(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { Immutable }}))
  )

  window.__redux_actions = reduxShrubInstance._composeActions();
  window.__redux_selectors = reduxShrubInstance._composeSelectors();

  console.log('Actions for this page:', window.__redux_actions);
  console.log('Selectors for this page:', window.__redux_selectors);

  return store
}

export const actions = () => {
  if (window.__redux_actions) {
    return window.__redux_actions;
  }
  else {
    throw new Error('Actions have not been globally declared.');
  }
}

export const selectors = () => {
  if (window.__redux_selectors) {
    return window.__redux_selectors;
  }
  else {
    throw new Error('Selectors have not been globally declared.');
  }
}
