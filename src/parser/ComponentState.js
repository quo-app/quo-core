import uuid from 'uuid/v1';

export default class ComponentState {
  constructor(title, ins = [], outs = [], props = {}, order = 0, id, type = 'self'){
    this.title = title;
    this.id = id || uuid();
    this.type = type;
    this.props = props;
    this.ins = ins;
    this.outs = outs;
    this.order = order;
  }
}

// a state node that contains states
class StateNode {
  constructor(states = [], neighbors = []){
    this.id = uuid();
    this.neighbors = neighbors
    this.states = states;
  }
  addNeighbor = neighbor => this.neighbors.push(neighbor)
  removeNeighbor = targetNeighbor => {
    this.neighbors = this.neighbors.filter(neighbor => neighbor !== targetNeighbor)
  }
}

export class StateGraph {
  addNode = (states, neighbors) => {
    let node = new StateNode(states, neighbors)
    this[node.id] = node;
    return node.id
  }
  addNeighbor = (nodeId, neighbor) => this[nodeId].addNeighbor(neighbor)
  removeNeighbor = (nodeId, neighbor) => this[nodeId].removeNeighbor(neighbor)
  removeNode = (nodeId) => delete this[nodeId]
}

// sidebar should take the selected state and update that. (updateComponentState)
// sidebar should render the selected state composited with the _core props.

// editComponent render should take the selected state and combine it with _core (requestCurrentEditedStateProps)

// previewComponent should look at the stateGraph to figure where to start, and switch nodes as necessary if an event
// triggers a node jump.

// the previewComponent should do some smart thinking about whether the link states and related stateNodes should be a part of 


// let state = {
//   _core : [], //core properties at import, call .deepFreeze() on this to guarantee.
//   // head is how to make sure what to render first
//   head: 'some node id',
//   // the state that the users can edit all the time in the viewer
//   defaultState: 'componentStateId2',
//   // usually there will be 2 nodes, the default containing node is the head, and the other one contains the hover, pressed etc.
//   stateGraph: {
//     'nodeId1': { states: [ componentStateIds ], neighbors: ['nodeId2']},
//     // there should be a bucket with the default state and that
//     'nodeId2': { states:[ componentStateIds ], neighbors: ['nodeId1', 'nodeId2']}
//   },
//   states: {
//     'componentStateId1': ComponentState,
//     'componentStateId2': ComponentState,
//     'componentStateId3': ComponentState,
//   }
// }

