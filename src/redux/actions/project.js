import uuid from 'uuid/v1';
import selectors from 'quo-redux/selectors';
import { projects } from 'quo-db';

/*
action: PREVIEW_PUSH_TO_CLOUD

payload: {
  id
}
*/

export const PROJECT_PUSH_TO_CLOUD = id => (dispatch, getState) => {
  // prepare the data to be sent as a preview instance
  const domain = selectors.domain(getState()).toJS();
  const projectData = JSON.stringify(domain);
  // const id = domain.tabs.tabs[domain.tabs.currentTab].rootComponent.id;
  projects.setProject(id, projectData);
}