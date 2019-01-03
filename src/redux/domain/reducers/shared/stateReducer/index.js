import { ReduxLeaf, ReduxBranch } from 'redux-shrub'
import uuid from 'uuid/v1';
import { OrderedSet } from 'immutable'

import active from './active';
import title from './title';
import type from './type';
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
    type,
    order,
    children,
    props,
    events
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

const LinkReducer = new ReduxBranch({
  slug: 'link',
  children: {
    active,
    id: new Id({ slug: 'id'}),
    targets: new Targets({ slug: 'target'}),
    title,
    type,
    order,
    children,
    props,
    events
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})
export { StateReducer, LinkReducer }
