import uuid from 'uuid/v1';
import _ from 'lodash';

import { assetToEditComponent } from 'quo-parser/editComponent'

import { State } from '../state';



// these actions only trigger a change
// in one point of the tree.
let actions = State._composeActions();

console.log(actions)

// extending the actions with

const ADD_ASSET_TO_EDITOR_AND_TAB = payload => (dispatch, getState) => {
  let id = uuid().toUpperCase()

  let { components, rootID } = assetToEditComponent(payload.component, payload.components)

  // add the components to components
  dispatch(actions.COMPONENTS_ADD_ASSET_COMPONENTS({ components }));

  dispatch(actions.TABS_ADD_ROOT_COMPONENT_TO_CURRENT({ id, rootID }))

}

export default _.merge(actions, {
  ADD_ASSET_TO_EDITOR_AND_TAB
})