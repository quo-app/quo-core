import { ReduxLeaf, createReduxBranch } from 'redux-shrub';

class CurrentStateReducer extends ReduxLeaf {
  _newState = () => ''
  update = state => payload => payload
}

let currentState = new CurrentStateReducer({
  slug: 'currentState',
})

let stateManager = createReduxBranch('statemanager', {
  currentState
})

export default stateManager