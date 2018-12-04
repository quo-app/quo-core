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

// one of the states id will be 'default'. this is what the edit
// will render first(children will be parsed through that)

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
  title: string,
  id: ComponentId,
  // add this to a state type
  stateGraph: {
    nodes: {
      [StateNodeId]: StateNode,
    },
    headNode: StateNodeId,
    activeNode: StateNodeId,
  },
  states: {
    [StateId]: State,
  },
  _coreProps: Property[]
}


// Flow of creating a component
// Use translator functions that return parts of a



// Translate Sketch Components

// the flow type system will declare the data structure of the
// redux store

// data comes => create components(this should be a function that returns pure data)

// creating the class abstractions are not necessary.

// parser
// AbstractComponent
   // Contains a type declaration