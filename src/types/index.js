// @flow

// Component
type ComponentId = string
type ComponentClass = 'page' | 'viewport' | 'group' | 'text' | 'shape';

// Property Types

type Property = {
  [string]: any
}

type MouseEvent = 'onMouseDown' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onMouseOut' | 'onMouseOver' | 'onMouseUp'

// Extend this in the future
type StateEvent = MouseEvent

// State Types
type StateId = string
type StateType = 'self' | 'link'

type State = {|
  title: string,
  id: StateId,
  type: StateType,
  order: number,
  class: ComponentClass,
  children: ComponentId[],
  props: Property[],
  ins: StateEvent[],
  outs: StateEvent[],
|}


// State Node types
type StateNodeId = string

type StateNode = {
  id: StateNodeId,
  neighbors: StateNodeId[],
  states: StateId[],
  active: StateId[],
}


type AbstractComponent = {
  name: string,
  id: ComponentId,
  // add this to a state type
  stateGraph: {
    [StateNodeId]: StateNode,
    headNode: StateNodeId,
    activeNode: StateNodeId,
  },
  states: {
    _core: Property[],
    [StateId]: State,
  }
}