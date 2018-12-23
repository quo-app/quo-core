
import _ from 'lodash';

import actions from './rootActions';
import * as customActions from './editComponent';

export default _.merge(actions, customActions);