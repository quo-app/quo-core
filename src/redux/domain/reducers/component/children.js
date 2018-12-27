// @flow

import _ from 'lodash'

import { ReduxLeaf } from 'redux-shrub';

class CompositeChildrenReducer extends ReduxLeaf {
  _newState = ({ state }) => {
    let children = [];
    if(state){
      let activeStates = state.filter(eachState => eachState.active)
      activeStates.map( activeState => {
        children = _.union(children, activeState.children)
      })
    }
    return children
  }

  _createComposite = states => {
    console.log(states);
  }

  update = state => payload => {
    this._createComposite(payload);
    return state
  }

}

const children = new CompositeChildrenReducer({
  slug: 'children'
})

export default children
