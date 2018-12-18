import { ReduxPolyBranch } from 'redux-shrub';
import _ from 'lodash';
import { Map } from 'immutable';

import accessors from 'quo-redux/accessors';

import ComponentReducer from './component';

class ComponentsReducer extends ReduxPolyBranch {
  addMultiple = state => ({ components }) => {
    _.mapValues(components, component => {
      state = this.add(state)(component)
      console.log(state);
    })
    console.log(state.toJS())
    return state
  }
}

let components = new ComponentsReducer({
  slug: 'components',
  accessor: accessors.component,
  childReducer: ComponentReducer
})

export default components