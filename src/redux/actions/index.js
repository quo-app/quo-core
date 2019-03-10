
import _ from 'lodash';

import actions from './rootActions';
import * as editActions from './editComponent';
import * as linkActions from './links';
import * as selectionActions from './selection';
import * as previewActions from './preview';

export default _.merge(actions,
                       editActions,
                       linkActions,
                       selectionActions,
                       previewActions);