import { ReduxLeaf } from 'redux-shrub';

class StateTypeReducer extends ReduxLeaf {
  static initialState = ({ type }) => {
    if(type) return type;
    return 'self'
  }
  __update = ({ type }) => type
}
const stateType = payload => new StateTypeReducer({
  slug: 'type',
  children: StateTypeReducer.initialState(payload)
})

export default stateType