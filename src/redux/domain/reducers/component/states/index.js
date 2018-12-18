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

import { Map } from 'immutable'
import _ from 'lodash'

import { ReduxLeaf, ReduxPolyBranch, ReduxBranch } from 'redux-shrub';

import title from './title';
import type from './type';
import order from './order';
import children from './children';
import props from './props';
import events from './events';

class Id extends ReduxLeaf {
  _newState = ({ stateID }) => stateID
}

class StatesReducer extends ReduxPolyBranch {
  _newState = ({ state }) => {
    let reducerState = Map()
    if(state){
      state.map(stateData => {
        reducerState = this.add(reducerState)(stateData)
      })
    }
    return reducerState
  }
}

const StateReducer = new ReduxBranch({
  slug: 'state',
  children: {
    id: new Id({ slug: 'id'}),
    title,
    type,
    order,
    children,
    props,
    events
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

let states = new StatesReducer({
  slug: 'states',
  accessor: 'stateID',
  childReducer: StateReducer,
})

export default states
