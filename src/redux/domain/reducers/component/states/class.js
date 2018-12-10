import { ReduxLeaf } from 'redux-shrub';

class StateClassReducer extends ReduxLeaf {
  _newState = payload => payload.class
  update = state => payload => payload.class
}
const stateClass = new StateClassReducer({ slug: 'class' })

export default stateClass