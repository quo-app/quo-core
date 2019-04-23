// @flow


// export const addComponentState = (components, action) => {
//   // this is incomplete
//   window.alert('adding state to component state');
//   // no component specified
//   if(!action.payload) return components;

//   return components;

// }

// Component
// type ComponentId = string
// type ComponentClass = 'viewport' | 'group' | 'text' | 'shape';
// type Property = { [string]: any }
// type MouseEvent = 'onMouseDown' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onMouseOut' | 'onMouseOver' | 'onMouseUp'
// type StateEvent = MouseEvent
// type StateId = string
// type StateType = 'self' | 'link'
// one of the states id will be 'default'. this is what the edit

// type State = {|
//   title: string,
//   id: StateId,
//   type: StateType,
//   order: number,
//   class: ComponentClass,
//   children: ComponentId[],
//   props: Property[],
//   add: StateEvent[],
//   remove: StateEvent[],
// |}

// // State Node types
// type StateNodeId = string

// type StateNode = {
//   id: StateNodeId,
//   neighbors: StateNodeId[],
//   states: StateId[],
//   active: StateId[],
// }

// type AbstractComponent = {
//   title: string,
//   id: ComponentId,
//   // add this to a state type
//   stateGraph: {
//     nodes: {
//       [StateNodeId]: StateNode,
//     },
//     headNode: StateNodeId,
//     activeNode: StateNodeId,
//   },
//   states: {
//     [StateId]: State,
//   },
//   _coreProps: Property[]
// }
import _ from 'lodash';
import { OrderedMap } from 'immutable'
import { ReduxPolyBranch } from 'redux-shrub'

import { StateReducer } from '../shared/stateReducer'

class StatesReducer extends ReduxPolyBranch {
  _newState = ({ states }) => {
    let reducerState = OrderedMap()

    if(Array.isArray(states)) {
      if (states) {
        states.map(stateData => {
          reducerState = this.add(reducerState)(stateData)
        })
      }
      return reducerState
    } else {
      if (states) {
        _.mapValues(states, stateData => {
          // this is terrible but can't think a better way...
          stateData.stateID = stateData.id;
          reducerState = this.add(reducerState)(stateData)
        })
      }
      return reducerState
    }
  }
}

let states = new StatesReducer({
  slug: 'states',
  accessor: 'stateID',
  childReducer: StateReducer
})

export default states
