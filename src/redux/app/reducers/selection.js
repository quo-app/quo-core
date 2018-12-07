// @flow

import { ReduxLeaf, ReduxBranch } from 'quo-redux/redux-wrapper';

type componentID = string;

class SelectedComponentsReducer extends ReduxLeaf {
  __update = (payload: componentID[]) : componentID[] => payload
  __clear = () => []
}

let selectedComponents = new SelectedComponentsReducer({
  slug: 'selectedComponents',
  children: []
})

class SelectablesReducer extends ReduxLeaf {
  __update = (payload: componentID[]) : componentID[] => payload
  __clear = () => []
}

let selectables = new SelectablesReducer({
  slug: 'selectables',
  children: []
})

let selection = new ReduxBranch({
  slug: 'selection',
  children: {
    selectedComponents,
    selectables
  }
})

export default selection