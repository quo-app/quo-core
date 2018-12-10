import { createReduxBranch } from 'redux-shrub';

import linkBuilder from './reducers/linkBuilder';
import appMode from './reducers/appMode';
import selection from './reducers/selection';
import user from './reducers/user';

// const appMode = combineReducersLoop({
//   'SET_APP_MODE': (appMode, action) => action.payload
// init should become LINKBUILDER_CLEAR
// set app mode => link builder update
// })
// const selection = combineReducersLoop({
//   'COMPONENT_SELECT': updateSelection,
//   'VIEWER_SELECTABLES': updateSelectables,
// })
// const linkBuilder = combineReducersLoop({
//   'UPDATE_LINK_BUILDER_DATA': updateLinkBuilderData,
// });

let app = createReduxBranch('app', {
  appMode,
  user,
  selection,
  linkBuilder
}, { includeSelfSelector: false });

export default app
