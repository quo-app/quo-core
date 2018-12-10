import { ReduxLeaf } from 'redux-shrub';
import { OrderedMap } from 'immutable';

class StatePropsReducer extends ReduxLeaf {
  _newState = ({ props }) => OrderedMap(props ? props : {});
  add = state => ({ prop }) => state.set(prop.key, prop.value)
  remove = state => ({ prop }) => state.delete(prop.key)
}

const stateProps = new StatePropsReducer({ slug: 'props' })

export default stateProps