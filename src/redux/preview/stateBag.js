import { ReduxBranch, ReduxLeaf } from 'redux-shrub';
import { Map } from 'immutable';
import _ from 'lodash';

class States extends ReduxLeaf {
  _newState = () => new Map({});
  add = state => ({ stateId, stateContent }) => state.set(stateId, stateContent)
  addMultiple = state => ({ states }) => {
    _.mapKeys(states, (currentState, stateId) => {
      state = this.add(state)({ stateContent: currentState, stateId });
    })
    return state;
  }
}

let StateBagReducer = new ReduxBranch({
  slug: 'statebag',
  children: {
    states: new States({ slug: 'state' })
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

export default StateBagReducer
