import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from './reducer';

const composeEnhancer = compose;

export default createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { Immutable }})),
);
