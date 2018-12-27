import { ReduxLeaf, createReduxBranch } from 'redux-shrub';

  /*
    The selected state on
    the right sidebar states tab
  */
class CurrentStateReducer extends ReduxLeaf {
  _newState = () => 'default'
  update = state => payload => payload
}

let currentState = new CurrentStateReducer({
  slug: 'currentState',
})

let stateManager = createReduxBranch('statemanager', {
  currentState
})

export default stateManager