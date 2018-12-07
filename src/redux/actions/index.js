import { State } from '../state';
import _ from 'lodash';

// these actions only trigger a change
// in one point of the tree.
let actions = State.createActions();

// extending the actions with
console.log(actions)

// const TABS_ADD_AND_SET_CURRENT = payload => dispatch => {
//   dispatch(actions.TABS_ADD(payload));
//   dispatch(actions.CURRENT_TAB_SET(payload.id));
// }

// const TABS_REMOVE_AND_UPDATE_CURRENT = payload => dispatch {

// }

export default _.merge(actions, {

})