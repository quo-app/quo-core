// @flow
import { ReduxLeaf } from 'redux-shrub';

class CompositeTypeReducer extends ReduxLeaf {
  _newState = ({ states, type }) => {
    // let type = ''
    // if (states) {
    //   let activeStates = states.filter(eachState => eachState.active)
    //   activeStates.map( activeState => {
    //     type = activeState.type
    //   })
    // }
    return type
  }
  _createComposite = states => {
    console.log(states);
  }
  update = state => payload => {
    this._createComposite(payload);
    return state
  }
}

const compositeType = new CompositeTypeReducer({
  slug: 'compositeType'
})

export default compositeType
