import { ReduxLeaf, ReduxBranch } from 'redux-shrub'
import uuid from 'uuid/v1'

import active from './active'
import title from './title'
import type from './type'
import order from './order'
import children from './children'
import props from './props'
import events from './events'

class Id extends ReduxLeaf {
  _newState = ({ stateID, linkID }) => stateID || linkID
}

class TargetID extends ReduxLeaf {
  _newState = ({ targetID }) => targetID || ''
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
    target: new TargetID({ slug: 'target'}),
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
