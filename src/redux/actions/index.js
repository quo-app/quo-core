
import _ from 'lodash';

import actions from './rootActions';
import { ADD_ASSET_TO_EDITOR_AND_TAB } from './editComponent';

export default _.merge(actions, {
  ADD_ASSET_TO_EDITOR_AND_TAB
})