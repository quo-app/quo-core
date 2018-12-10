import { ReduxLeaf } from 'redux-shrub';
import { OrderedSet } from 'immutable';

class StateChildrenReducer extends ReduxLeaf {
  static initialState = ({ children }) => OrderedSet(children ? children : [])
  __add = ({ child }) => this.state.set(child)
  __remove = ({ child }) => this.state.delete(child)
}
const stateChildren = payload => new StateChildrenReducer({
  slug: 'children',
  children: StateChildrenReducer.initialState(payload)
})

export default stateChildren