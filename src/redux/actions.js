import * as actions from './actions';
import { mergeActions } from './helpers';

console.log(mergeActions(actions));
//add custom action middleware here
export default mergeActions(actions)
