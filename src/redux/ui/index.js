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

import { ReduxBranch } from 'quo-redux/redux-wrapper';

import keyManager from './reducers/keyManager';
import stateManager from './reducers/stateManager';
import messages from './reducers/messages';
import sidebars from './reducers/sidebars';

let ui = new ReduxBranch({
  slug: 'ui',
  children: {
    keyManager,
    stateManager,
    messages,
    sidebars
  }
})

export default ui
