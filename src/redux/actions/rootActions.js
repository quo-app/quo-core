import { State } from '../state';

// these actions only trigger a change
// in one point of the tree.
let actions = State._composeActions()
console.log(actions)
export default actions