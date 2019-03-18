import uuid from 'uuid/v1';
import selectors from 'quo-redux/selectors';
import { previews } from 'quo-db';
import actions from './rootActions';

/*
action: PREVIEW_PUSH_TO_CLOUD

payload: {
  preview
}
*/

export const PREVIEW_PUSH_TO_CLOUD = preview => (dispatch, getState) => {
  // prepare the data to be sent as a preview instance
  const domain = selectors.domain(getState()).toJS();
  const previewData = JSON.stringify(domain);
  const id = domain.tabs.tabs[domain.tabs.currentTab].rootComponent.id;
  previews.addToPreviews(id, previewData).then(() => {
    previews.getAllPreviews().then(data => console.log(id))
  })
}