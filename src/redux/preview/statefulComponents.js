
import { ReduxPolyBranch } from 'redux-shrub';
import accessors from './accessors';
import StatefulComponent from './statefulComponent';
import _ from 'lodash';

class StatefulComponentsReducer extends ReduxPolyBranch {
  addMultiple = state => ({ components }) => {
    _.mapValues(components, component => {
      state = this.add(state)(component)
    })
    return state
  }
}

let statefulComponents = new StatefulComponentsReducer({
  slug: 'components',
  accessor: accessors.component,
  childReducer: StatefulComponent
})

export default statefulComponents;
