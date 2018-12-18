import uuid from 'uuid/v1';

import { assetToEditComponent } from 'quo-parser/editComponent'

import actions from './rootActions';

const ADD_ASSET_TO_EDITOR_AND_TAB = payload => (dispatch, getState) => {
  let id = uuid().toUpperCase()

  let { components, rootID } = assetToEditComponent(payload.component, payload.components)
  console.log(components)
  // add the components to components
  dispatch(actions.COMPONENTS_ADD_MULTIPLE({ components }));

  dispatch(actions.TABS_ADD_ROOT_COMPONENT_TO_CURRENT({ id, rootID }))

}



// create the components
// create the states
// send the rootID to the tab

export { ADD_ASSET_TO_EDITOR_AND_TAB }