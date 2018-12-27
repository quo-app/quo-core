import uuid from 'uuid/v1';
import _ from 'lodash';

class Connection {
  constructor(id1, id2){
    this.id = uuid();
    this.source = id1;
    this.target = id2;
  }
}

class StateLinks {
  static addEdge = (edges, source, target) => {
    let edge = new Connection(source, target)
    edges[edge.id] = edge;
  }

  static removeEdge = (edges, edge) => delete edges[edge.id]

  static removeEdgesWith = (edges, id) =>  _.pickBy(edges, edge => edge.source !== id && edge.target !== id)

  static getEdgesFrom = (edges, id) => _.pickBy(edges, edge => edge.source === id)

  static getEdgesTo = (edges, id) => _.pickBy(edges, edge => edge.target === id)
}

export default StateLinks
