import { ReduxLeaf, ReduxBranch } from 'redux-shrub'

import active from './active'
import title from './title'
import type from './type'
import order from './order'
import children from './children'
import props from './props'
import events from './events'

class Id extends ReduxLeaf {
  _newState = ({ stateID }) => stateID
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

export default StateReducer
