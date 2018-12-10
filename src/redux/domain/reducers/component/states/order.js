import { ReduxLeaf } from 'redux-shrub';

class StateOrderReducer extends ReduxLeaf {
  _newState = ({ order }) => order ? order : 0
  update = state => ({ order }) => order
}

const stateOrder = new StateOrderReducer({ slug: 'order' })

export default stateOrder