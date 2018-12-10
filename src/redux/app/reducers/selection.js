// @flow

import { ReduxLeaf, createReduxBranch } from 'redux-shrub';
import { OrderedSet } from 'immutable';

type componentID = string;

class SelectedComponentsReducer extends ReduxLeaf {
  _newState = () => OrderedSet()
  update = state => (payload: componentID[]) => state.union(payload)
  clear = state => payload => this._newState()
}

class SelectablesReducer extends ReduxLeaf {
  _newState = () => OrderedSet()
  update = state => (payload: componentID[]) : componentID[] => state.union(payload)
  clear = state => payload => this._newState()
}

let selectedComponents = new SelectedComponentsReducer({ slug: 'selectedComponents' })
let selectables = new SelectablesReducer({ slug: 'selectables' })

let selection = createReduxBranch('selection', { selectedComponents, selectables })

export default selection