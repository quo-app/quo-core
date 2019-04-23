// @flow

import { Map } from 'immutable'

import { ReduxLeaf } from 'redux-shrub';

class CompositePropsReducer extends ReduxLeaf {
  _newState = ({ states, props }) => {
    // let props = Map();
    // if (states) {
    //   let activeStates = states.filter(eachState => eachState.active)
    //   activeStates.map( activeState => {
    //     props = Map(activeState.props).merge(props);
    //   })
    // }
    // return props
    return Map(props)
  }
  update = state => ({ props }) => props
}

const props = new CompositePropsReducer({
  slug: 'props'
})

export default props
