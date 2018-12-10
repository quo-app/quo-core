import { createReduxBranch } from 'redux-shrub';



// const assets = combineReducersLoop({
//   'UPLOAD_SKETCH':uploadSketch,
//   'UPLOAD_IMAGE':uploadImage,
// });

// const previewInstances = combineReducersLoop({
//   'CREATE_PREVIEW_INSTANCE': createPreviewInstance,
//   'REMOVE_PREVIEW_INSTANCE': removePreviewInstance,
// })

// const components = combineReducersLoop({
//   'ADD_COMPONENT_TO_COMPONENTS': (components, action) => (_.merge(components,action.payload)),
//   'UPDATE_COMPONENT_PROPS': updateComponentProps,
//   'SET_LINK_SOURCE': setLinkSource,
//   'SET_LINK_TARGET': setLinkTarget,
//   'ADD_COMPONENT_STATE': addComponentState,
//   'ADD_STATE_TO_COMPOSITE': addStateToComposite,
//   'REMOVE_STATE_FROM_COMPOSITE': removeStateFromComposite,
// });

// const tabs = combineReducersLoop({
//   'NEW_TAB': newTab,
//   'CHANGE_ACTIVE_TAB': changeActiveTab,
//   'EDIT_TAB': editTab,
//   'DELETE_TAB': deleteTab,
//   'ADD_COMPONENT_TO_TAB': addComponent,
//   'ADD_IMAGE_COMPONENT_TO_TAB': addImageComponent,
// });

// const domain = combineReducers({
//   assets,
//   projects,
//   components,
//   previewInstances,
//   tabs,
// });

import components from './reducers/components';
import projects from './reducers/projects';
import assets from './reducers/assets';
import tabs from './reducers/tabs';
import previews from './reducers/previews';

const domain = createReduxBranch('domain', {
  components,
  previews,
  assets,
  projects,
  tabs,
})

export default domain
