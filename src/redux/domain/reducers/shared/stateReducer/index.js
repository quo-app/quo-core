import { ReduxLeaf, ReduxBranch } from 'redux-shrub'
import { OrderedSet } from 'immutable'

import active from './active';
import title from './title';
import order from './order';
import children from './children';
import props from './props';
import events from './events';

class Id extends ReduxLeaf {
  _newState = ({ stateID, linkID }) => stateID || linkID
}

class Targets extends ReduxLeaf {
  _newState = ({ targets }) => targets ? OrderedSet.of(targets) : OrderedSet()
  add = state => ({ target }) => state.add(target)
  addMultiple = state => ({ targets }) => state.union(targets)
  remove = state => ({ target }) => state.delete(target)
}

const StateReducer = new ReduxBranch({
  slug: 'state',
  children: {
    active,
    id: new Id({ slug: 'id'}),
    title,
    order,
    children,
    props,
    events
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

class LinkOrderChange extends ReduxLeaf {
  _newState = ({ orderChange }) => orderChange || 1
}

const LinkReducer = new ReduxBranch({
  slug: 'link',
  children: {
    active,
    id: new Id({ slug: 'id'}),
    targets: new Targets({ slug: 'target'}),
    title,
    order,
    orderChange: new LinkOrderChange ({ slug: 'orderChange' }),
    children,
    props,
    events
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})
export { StateReducer, LinkReducer }
