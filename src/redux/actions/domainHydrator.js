import selectors from 'quo-redux/selectors'
import actions from './rootActions'
import assets from '../domain/reducers/assets';
import _ from 'lodash';
import tabs from '../domain/reducers/tabs';

/*
action: HYDRATE_DOMAIN

payload: {
  domain data
}

A full hydration of the domain.
*/

export const HYDRATE_DOMAIN = projectData => (dispatch, getState) => {
  console.log(projectData);

  // ADD ALL ASSETS
  _.mapKeys(projectData.assets.sketch, (data, id) => {
    dispatch(actions.SKETCH_ASSETS_ADD_EXISTING({ id, data }))
  })
  // UPDATE LINKS
  // PREVIEWS
  // TABS

  // COMPONENTS

  const { components } = projectData;
  dispatch(actions.COMPONENTS_ADD_MULTIPLE({ components }));

  const { tabs }= projectData;
  _.mapValues(tabs.tabs, tab => {
    dispatch(actions.TABS_ADD_EXISTING(tab));
  })
  dispatch(actions.TABS_CHANGE_ACTIVE({ id: tabs.currentTab}))
}