// @flow

import _ from 'lodash'

import { ReduxLeaf } from 'redux-shrub';

// import children from './states/children';
// import props from './states/props';

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

const compositeChildren = new CompositeChildrenReducer({
  slug: 'compositeChildren'
})

export default compositeChildren
