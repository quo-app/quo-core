// @flow
import { ReduxLeaf } from 'redux-shrub';

class CompositeReducer extends ReduxLeaf {
  _newState = ({ state }) => {
    let type = ''
    if(state){
      let activeStates = state.filter(eachState => eachState.active)
      activeStates.map( activeState => {
        type = activeState.type
      })
    }
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

const compositeType = new CompositeReducer({
  slug: 'compositeType'
})

export default compositeType
