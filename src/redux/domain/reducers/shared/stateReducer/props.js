import { ReduxLeaf } from 'redux-shrub';
import { Map } from 'immutable';

class StatePropsReducer extends ReduxLeaf {

  _newState = ({ props }) => Map(props ? props : {});

  /*
    Takes in a object of properties and update the state
    with
  */
  update = state => ({ props }) => {
    Object.entries(props).forEach( ([key, value]) => {
      state = state.set(key, value)
    })
    return state
  }
  remove = state => ({ prop }) => state.delete(prop.key)
}

const stateProps = new StatePropsReducer({ slug: 'props' })

export default stateProps