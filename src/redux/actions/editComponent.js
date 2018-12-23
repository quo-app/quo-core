import uuid from 'uuid/v1';

import { assetToEditComponent } from 'quo-parser/editComponent'

import actions from './rootActions';
import selectors from 'quo-redux/selectors';

export const ADD_ASSET_TO_EDITOR_AND_TAB = payload => (dispatch, getState) => {
  let id = uuid().toUpperCase()

  let { components, rootID } = assetToEditComponent(payload.component, payload.components)
  // add the components to components
  dispatch(actions.COMPONENTS_ADD_MULTIPLE({ components }));

  dispatch(actions.TABS_ADD_ROOT_COMPONENT_TO_CURRENT({ id, rootID }))

}

/*
action: EDIT_COMPONENT_PROPS_UPDATE

payload: {
  id: component id,
  stateID: state id,
  props: props obj
}

Updates the corresponding props of the state and
applies the changes to the main props key of the
component.
*/

export const EDIT_COMPONENT_PROPS_UPDATE = payload => (dispatch, getState) => {
  /*
    - update the specific state props
    - perform a recalculation of the main props obj
    - set the props obj to be this
  */
  const { id } = payload
  dispatch(actions.COMPONENT_STATE_PROPS_UPDATE(payload))
  let state = getState()
  let props = selectors.componentProps(state, { id });
  let states = selectors.componentStates(state, { id});
  console.log(states);
}

/*
function: combineStateProps

states: Map of state objects

Ignoring the order property of the states,
returns a merged property Map by looping through
the ordered states.
*/

const combineStateProps = states => {

}