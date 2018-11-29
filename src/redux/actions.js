import * as actions from './actions';
import { mergeActions } from './helpers';
console.log(actions);
let actionsMerged = mergeActions(actions)

//add custom action middleware here
export default actionsMerged
