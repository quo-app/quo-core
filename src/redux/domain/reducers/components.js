import { ReduxPolyBranch } from 'redux-shrub';
import _ from 'lodash';
import { Map } from 'immutable';

import accessors from 'quo-redux/accessors';

import ComponentReducer from './component';

class ComponentsReducer extends ReduxPolyBranch {
  addAssetComponents = state => ({ components }) => {
    components = _.mapValues(components, Map);
    return state.merge(components)
  }
}

let components = new ComponentsReducer({
  slug: 'components',
  accessor: accessors.component,
  childReducer: ComponentReducer
})

export default components