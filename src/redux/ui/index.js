// import { combineReducers } from 'redux';

// import { combineReducersLoop } from '../../helpers';

// import { updateTab, resizeSidebar } from './reducers/sidebars';
// import { addMessage, removeMessage } from './reducers/messages';

// import { updateStateManager } from './reducers/stateManager';

// const controller = (state = {}, action) => { return state };

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

// const ui = combineReducers({
//   controller,
//   sidebars,
//   messages,
//   stateManager,
// })

// export default ui

import { ReduxBranch } from 'quo-redux/redux-wrapper';

import keyManager from './reducers/keyManager';
import stateManager from './reducers/stateManager';
import messages from './reducers/messages';

let ui = new ReduxBranch({
  slug: 'ui',
  children: {
    keyManager,
    stateManager,
    messages
  }
})

export default ui
