import { ReduxLeaf } from 'redux-shrub';
import { OrderedMap } from 'immutable';

class StatePropsReducer extends ReduxLeaf {
  static initialState = ({ props }) => OrderedMap(props ? props : {});
  __add = ({ prop, _state }) => {
    // console.log(_state.toJS());
    this.state = this.state.set(prop.key, prop.value)
    return this.state
  }
  __remove = ({ prop }) => this.state.delete(prop.key)
}
const stateProps = payload => new StatePropsReducer({
  slug: 'props',
  children: StatePropsReducer.initialState(payload)
})

export default stateProps