import { ReduxLeaf } from 'redux-shrub';

class StateActiveReducer extends ReduxLeaf {
  _newState = ({ active }) => active || false
  update = state => ({ active }) => active
}

const stateActive = new StateActiveReducer({ slug: 'order' })

export default stateActive