// @flow
import { ReduxBranch, ReduxLeaf } from 'redux-shrub';

class CurrentStateReducer extends ReduxLeaf {
  _newState = () => 'default'
  update = state => payload => payload
}

const currentState = new CurrentStateReducer({
  slug: 'currentState'
})

const ui = new ReduxBranch ({
  slug: 'ui',
  children: {
    currentState,
  },
})

export default ui
