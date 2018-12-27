import uuid from 'uuid/v1'
import { Map } from 'immutable'

import { assetToEditComponent } from 'quo-parser/editComponent'
import selectors from 'quo-redux/selectors'

import actions from './rootActions'

/*
action: ADD_ASSET_TO_EDITOR_AND_TAB

payload: {
  components: obj of asset components
  rootID: the component id that will
  be at the root of the addition,
}

Gets a tree from the assets and adds it to
components as well as adding those components
to the current editor tab.
*/

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
  dispatch(actions.COMPONENT_STATE_PROPS_UPDATE(payload));

  //

  let currentState = selectors.currentState(getState(), { id })
  let states = selectors.componentStates(getState(), { id });
  let props = combineStateWithDefault(states, currentState);
  dispatch(actions.COMPONENT_PROPS_UPDATE({ id, props}));
}

/*
function: combineStateWithDefault

states: Map of state objects

Combine the current state props with default
props
*/

const combineStateWithDefault = (states, currentState) => {
  const defaultStateProps = states.getIn(['default', 'props'])
  const currentStateProps = states.getIn([currentState, 'props'])
  return defaultStateProps.merge(currentStateProps);
}