import { ReduxPolyBranch } from 'redux-shrub';

import ComponentReducer from './component';

// any reducer under a PolyBranch will have
// to unpack a payload since the keys used for
// reaching the subState are stored in the payload
// as well

let components = new ReduxPolyBranch({
  slug: 'components',
  // all the components must be the same here.
  accessor: 'id',
  childReducer: ComponentReducer
})

export default components