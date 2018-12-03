// export const updateStateManager = (stateManager, action) => {
//   return { ...stateManager, ...action.payload }
// }

import { ReduxLeaf, ReduxBranch } from 'quo-redux/redux-wrapper';

class CurrentStateReducer extends ReduxLeaf {
  static initialState = () => ''
  __update = payload => payload
}

let currentState = new CurrentStateReducer({
  slug: 'currentState',
  children: CurrentStateReducer.initialState()
})

let stateManager = new ReduxBranch({
  slug: 'statemanager',
  children: {
    currentState
  }
})

export default stateManager