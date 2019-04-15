import selectors from 'quo-redux/selectors'
import actions from './rootActions'

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
  // SKETCH ASSETS
  // UPDATE LINKS
  // PREVIEWS
  // TABS
  // COMPONENTS
}