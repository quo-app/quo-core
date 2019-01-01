import uuid from 'uuid/v1';
import generateName from 'sillyname';
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

export const LINKS_ADD_NEW = payload => (dispatch, getState) => {
  let linkID = uuid();

  let links = selectors.links(getState());
  // if the sourceLink already exists
  if(!links.has(payload.linkSource)) {
    dispatch(actions.LINKS_ADD(payload));
  }

  // initialize link
  dispatch(actions.LINK_ADD({ ...payload, linkID, title: generateName() }))

}