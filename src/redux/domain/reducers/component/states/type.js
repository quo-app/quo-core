import { ReduxLeaf } from 'redux-shrub';

class StateTypeReducer extends ReduxLeaf {
  _newState = ({ type }) => type ? type : 'self'
  update = payload => ({ type }) => type
}
const stateType = new StateTypeReducer({ slug: 'type' })

export default stateType