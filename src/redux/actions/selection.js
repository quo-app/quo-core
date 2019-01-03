import selectors from 'quo-redux/selectors';

import actions from './rootActions';

/*
action: LINKS_NEW_ADD

payload: {
  linkSource
}

Gets a tree from the assets and adds it to
components as well as adding those components
to the current editor tab.
*/

export const SELECTION_UPDATE = payload => (dispatch, getState) => {
  let state = getState();
  let targetSelectionEnabled = selectors.targetSelection(state)



  if(targetSelectionEnabled){
    //get current link
    let activeLinkPath = selectors.activeLink(state);
    dispatch(actions.LINK_TARGET_ADD_MULTIPLE({...activeLinkPath, targets: payload}))
    return;
  }
  dispatch(actions.SELECTED_COMPONENTS_UPDATE(payload));
}