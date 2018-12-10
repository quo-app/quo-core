// const sidebars = combineReducersLoop({
//   'UPDATE_SIDEBAR_TAB': updateTab,
//   'RESIZE_SIDEBAR': resizeSidebar,
// })

// const messages = combineReducersLoop({
//   'ADD_MESSAGE': addMessage,
//   'REMOVE_MESSAGE': removeMessage,
// })

// const stateManager = combineReducersLoop({
//   'STATE_MANAGER_UPDATE': updateStateManager,
// })

import { createReduxBranch } from 'redux-shrub';

import keyManager from './reducers/keyManager';
import stateManager from './reducers/stateManager';
import messages from './reducers/messages';
import sidebars from './reducers/sidebars';

let ui = createReduxBranch('ui', {
  keyManager,
  stateManager,
  messages,
  sidebars
}, { includeSelfSelector: false })

export default ui
