// @flow

import { ReduxLeaf, createReduxBranch } from 'redux-shrub';
import { OrderedSet } from 'immutable';

type componentID = string;

class SelectedComponentsReducer extends ReduxLeaf {
  _newState = () => []
  update = state => (payload: componentID[]) => payload
  add = state => (payload: componentID[]) => state.concat(payload);
  clear = state => payload => this._newState()
}

class SelectablesReducer extends ReduxLeaf {
  _newState = () => []
  update = state => (payload: componentID[]) : componentID[] => payload
  clear = state => payload => this._newState()
}

let selectedComponents = new SelectedComponentsReducer({ slug: 'selectedComponents' })
let selectables = new SelectablesReducer({ slug: 'selectables' })

let selection = createReduxBranch('selection', { selectedComponents, selectables })

export default selection