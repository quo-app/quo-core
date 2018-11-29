import { combineReducers } from 'redux';
import _ from 'lodash';
import { combineReducersLoop } from '../../helpers.js';

import { uploadSketch, uploadImage } from './reducers/upload';
import { newTab, changeActiveTab, editTab, deleteTab } from './reducers/tabs';
// Component Actions
import { addComponent, addImageComponent } from './reducers/component/component';
import { updateComponentProps, addStateToComposite, removeStateFromComposite } from './reducers/component/props';
import { setLinkSource, setLinkTarget } from './reducers/component/links';
import { addComponentState } from './reducers/component/states';
// Preview Instance
import { createPreviewInstance, removePreviewInstance } from './reducers/previewInstances.js';

const assets = combineReducersLoop({
  'UPLOAD_SKETCH':uploadSketch,
  'UPLOAD_IMAGE':uploadImage,
});

const projects = combineReducersLoop({

});

const previewInstances = combineReducersLoop({
  'CREATE_PREVIEW_INSTANCE': createPreviewInstance,
  'REMOVE_PREVIEW_INSTANCE': removePreviewInstance,
})

const components = combineReducersLoop({
  'ADD_COMPONENT_TO_COMPONENTS': (components, action) => (_.merge(components,action.payload)),
  'UPDATE_COMPONENT_PROPS': updateComponentProps,
  'SET_LINK_SOURCE': setLinkSource,
  'SET_LINK_TARGET': setLinkTarget,
  'ADD_COMPONENT_STATE': addComponentState,
  'ADD_STATE_TO_COMPOSITE': addStateToComposite,
  'REMOVE_STATE_FROM_COMPOSITE': removeStateFromComposite,
});

const tabs = combineReducersLoop({
  'NEW_TAB': newTab,
  'CHANGE_ACTIVE_TAB': changeActiveTab,
  'EDIT_TAB': editTab,
  'DELETE_TAB': deleteTab,
  'ADD_COMPONENT_TO_TAB': addComponent,
  'ADD_IMAGE_COMPONENT_TO_TAB': addImageComponent,
});

const domain = combineReducers({
  assets,
  projects,
  components,
  previewInstances,
  tabs,
});

export default domain
