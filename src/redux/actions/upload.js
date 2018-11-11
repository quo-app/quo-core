import messageActions from './messageStack';
import { getState } from 'quo-redux/state';
import componentActions from './component';

const UPLOAD_SKETCH_ACTION = (uploadData) => ({
  type: 'UPLOAD_SKETCH',
  payload: uploadData
});

const UPLOAD_SKETCH  = (uploadData) => (dispatch) => {
  dispatch(UPLOAD_SKETCH_ACTION(uploadData));
  dispatch(messageActions.ADD_MESSAGE({type:'status',duration:1500,text:'Sketch page uploaded'}));
}

const UPLOAD_IMAGE_ACTION = uploadData => ({
  type: 'UPLOAD_IMAGE',
  payload: uploadData
});

const UPLOAD_IMAGE = uploadData => (dispatch, getFullState) => {
  dispatch(UPLOAD_IMAGE_ACTION(uploadData));
  let domain = getState(getFullState(), 'domain');
  let images = domain.assets.image;
  Object.values(images).forEach(image => {
    dispatch(componentActions.ADD_IMAGE_COMPONENT(image, domain))
  });
}

export default {
  UPLOAD_SKETCH,
  UPLOAD_IMAGE
}
