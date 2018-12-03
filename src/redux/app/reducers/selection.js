// @flow

import { ReduxLeaf, ReduxBranch } from 'quo-redux/redux-wrapper';

type componentID = string;

class ComponentSelectReducer extends ReduxLeaf {
  __update = (payload: componentID[]) : componentID[] => payload
  __clear = () => []
}

let componentSelect = new ComponentSelectReducer({
  slug: 'componentSelect',
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
    componentSelect,
    selectables
  }
})

export default selection