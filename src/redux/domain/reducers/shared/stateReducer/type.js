import { ReduxLeaf } from 'redux-shrub';

class StateTypeReducer extends ReduxLeaf {
  _newState = ({ type }) => type
  update = state => ({ type }) => type
}
const stateType = new StateTypeReducer({ slug: 'class' })

export default stateType