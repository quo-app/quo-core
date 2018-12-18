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
  _createComposite = states => {
    console.log(states);
  }
  update = state => payload => {
    this._createComposite(payload);
    return state
  }
}

const props = new CompositePropsReducer({
  slug: 'props'
})

export default props
