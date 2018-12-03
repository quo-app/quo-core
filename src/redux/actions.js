// import * as actions from './actions';
// import { mergeActions } from './helpers';

// let actionsMerged = mergeActions(actions)

// //add custom action middleware here
// export default actionsMerged

import { State } from './state';

let actions = State.createActions();

console.log(actions);

export default actions
