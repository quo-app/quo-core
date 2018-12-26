import { ReduxBranch, ReduxLeaf } from 'redux-shrub'

import title from './title'
import states from './states'
import type from './type';
import children from './children';
import props from './props';
import parent from './parent';

class ID extends ReduxLeaf {
  _newState = ({ id }) => id
}

let ComponentReducer = new ReduxBranch({
  slug: 'component',
  children: {
    id: new ID({ slug: 'id'}),
    title,
    type,
    children,
    props,
    parent,
    states
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

export default ComponentReducer