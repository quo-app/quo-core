import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createReduxRoot } from 'redux-shrub';
import statefulComponents from './statefulComponents';
import stateBags from './stateBags';
import processing from './processing';
import _ from 'lodash';

const CREATE_STATEFUL_COMPONENTS = ({ components }) => (dispatch, getState) => {
  dispatch(actions.COMPONENTS_ADD_MULTIPLE({components: components}))
  dispatch(actions.STATEBAGS_ADD_MULTIPLE({components: components, stateBagId: '0'}))
  _.mapKeys(components, (component, id) => {
    dispatch(actions.STATEBAG_STATE_ADD_MULTIPLE({states: component.states, stateBagId: `${component.id}:0`}))
  })
  dispatch(actions.PROCESSING_UPDATE());
}

const state = createReduxRoot('root', { statefulComponents, stateBags, processing })
let selectors = state._composeSelectors();
let actions = _.merge(state._composeActions(), { CREATE_STATEFUL_COMPONENTS });
let reducer = state._createMainReducer();

window.__redux_actions = actions;
window.__redux_selectors = selectors;

console.log('Actions for this page:', window.__redux_actions);
console.log('Selectors for this page:', window.__redux_selectors);

const composeEnhancer = compose;
let middleware;

if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
  middleware = composeEnhancer(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: { Immutable }}))
}
else {
  middleware = composeEnhancer(applyMiddleware(thunk));
}

export const previewStore = () => createStore(
  reducer,
  middleware
);

export { actions, selectors };
