import { ReduxLeaf } from 'redux-shrub';

class StateOrderReducer extends ReduxLeaf {
  static initialState = ({ order }) => {
    if(order) return order;
    return 0
  }
  __update = ({ order }) => order
}
const stateOrder = payload => new StateOrderReducer({
  slug: 'order',
  children: StateOrderReducer.initialState(payload)
})

export default stateOrder