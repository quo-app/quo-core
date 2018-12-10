import { ReduxLeaf } from 'redux-shrub';

class StateClassReducer extends ReduxLeaf {
  static initialState = payload => payload.class
  __update = payload => payload.class
}
const stateClass = payload => new StateClassReducer({
  slug: 'class',
  children: StateClassReducer.initialState(payload)
})

export default stateClass