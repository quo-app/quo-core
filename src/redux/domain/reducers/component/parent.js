// @flow
import { ReduxLeaf } from 'redux-shrub';

class CompositeParentReducer extends ReduxLeaf {
  _newState = ({ state }) => {
    let parent = ''
    if(state){
      let activeStates = state.filter(eachState => eachState.active)
      activeStates.map( activeState => {
        parent = activeState.parent
      })
    }
    return parent
  }
  _createComposite = states => {
    console.log(states);
  }
  update = state => payload => {
    this._createComposite(payload);
    return state
  }
}

const parent = new CompositeParentReducer({
  slug: 'parent'
})

export default parent
