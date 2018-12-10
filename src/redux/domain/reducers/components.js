import { ReduxPolyBranch } from 'redux-shrub';

import accessors from 'quo-redux/accessors';

import ComponentReducer from './component';

let components = new ReduxPolyBranch({
  slug: 'components',
  accessor: accessors.component,
  childReducer: ComponentReducer
})

export default components