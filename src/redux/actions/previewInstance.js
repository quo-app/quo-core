import { getState } from 'quo-redux/state';

export const CREATE_PREVIEW_INSTANCE = ({selectedComponents, previewId}) => (dispatch, getFullState) => {

  let allComponents = getState(getFullState(), 'domain').components;
  // this would actually be a real array of components
  selectedComponents = Object.keys(allComponents);
  console.log(selectedComponents)
  dispatch({
    payload: {
      allComponents,
      selectedComponents,
      previewId,
    },
    type: 'CREATE_PREVIEW_INSTANCE'
  })
}

export const REMOVE_PREVIEW_INSTANCE = id => ({
  id,
  type: 'REMOVE_PREVIEW_INSTANCE'
})

export default {
  CREATE_PREVIEW_INSTANCE,
  REMOVE_PREVIEW_INSTANCE
}