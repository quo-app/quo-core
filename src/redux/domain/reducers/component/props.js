// @flow

import { Map } from 'immutable'

import { ReduxLeaf } from 'redux-shrub';

class CompositePropsReducer extends ReduxLeaf {
  _newState = ({ state }) => {
    let props = Map();
    if(state){
      let activeStates = state.filter(eachState => eachState.active)
      activeStates.map( activeState => {
        props = Map(activeState.props).merge(props);
      })
    }
    return props
  }
  update = state => ({ props }) => props
}

const props = new CompositePropsReducer({
  slug: 'props'
})

export default props
