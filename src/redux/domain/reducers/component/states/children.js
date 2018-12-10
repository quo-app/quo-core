import { ReduxLeaf } from 'redux-shrub';
import { OrderedSet } from 'immutable';

class StateChildrenReducer extends ReduxLeaf {
  _newState = ({ children }) => OrderedSet(children ? children : [])
  add = state => ({ child }) => state.set(child)
  remove = state => ({ child }) => state.delete(child)
}

const stateChildren = new StateChildrenReducer({ slug: 'children' })

export default stateChildren