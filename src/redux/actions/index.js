
import _ from 'lodash';

import actions from './rootActions';
import * as editActions from './editComponent';
import * as linkActions from './links';

export default _.merge(actions, editActions, linkActions);