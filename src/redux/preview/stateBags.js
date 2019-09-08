import { ReduxPolyBranch } from 'redux-shrub';
import _ from 'lodash';
import accessors from './accessors';
import StateBag from './stateBag';

class StateBagsReducer extends ReduxPolyBranch {
  addMultiple = state => ({ components, stateBagId }) => {
    _.mapValues(components, component => {
      state = this.add(state)({ [accessors.stateBagId]: `${component.id}:${stateBagId}`})
    })
    return state
  }
}

const stateBags = new StateBagsReducer({
  slug: 'statebags',
  accessor: accessors.stateBagId,
  childReducer: StateBag,
})

export default stateBags;
