import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { storeInitial } from './state';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  storeInitial,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),

);
