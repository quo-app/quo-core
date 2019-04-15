import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { editorReducer, previewReducer } from './reducer';

const composeEnhancer = compose;

export const editorStore = () => createStore(
  editorReducer,
  composeEnhancer(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { Immutable }})),
);

export const previewStore = () => createStore(
  previewReducer,
  composeEnhancer(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { Immutable }})),
);
