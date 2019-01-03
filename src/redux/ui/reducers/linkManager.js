import { ReduxLeaf, createReduxBranch } from 'redux-shrub';

  /*
    The selected state on
    the right sidebar states tab
  */
class TargetSelectionReducer extends ReduxLeaf {
  _newState = () => false
  enable = state => () => true
  disable = state => () => false
}

class ActiveLinkReducer extends ReduxLeaf {
  _newState = () => ({ linkSource: '', linkID: ''})
  update = state => ({ linkSource, linkID }) => ({ linkSource, linkID })
}

let targetSelection = new TargetSelectionReducer({
  slug: 'linkTargetSelection',
})

let activeLink = new ActiveLinkReducer({
  slug: 'activeLink'
})

let linkManager = createReduxBranch('linkmanager', {
  targetSelection,
  activeLink,
})

export default linkManager