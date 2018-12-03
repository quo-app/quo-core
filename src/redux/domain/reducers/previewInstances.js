import { createNewIds, traverseAndAdd } from 'quo-utils/component';
import _ from 'lodash';

export const createPreviewInstance = (previewInstances, action) => {
  // components is an array of root components;
  // previewing a tab means previewing the root of the tab
  // previewing a bunch of components mean previewing them and
  // their children
  let { allComponents, selectedComponents, previewId } = action.payload;
  // selected components is an object of components
  // components
  let selectedComponentsObj = selectedComponents.map( id => allComponents[id]);
  let flattenedSelections = _.map(selectedComponentsObj, comp => traverseAndAdd(comp, allComponents));

  // create new ids here but just make a root instead of having to think of every id in that
  // array as a root id! genius!
  flattenedSelections = flattenedSelections.reduce(_.merge, {})
  let { components } = createNewIds({components: flattenedSelections});

  // do the state management here!

  let root = { children: selectedComponents }

  previewInstances[previewId] = { components, root};
  return previewInstances
}

export const removePreviewInstance = (previewInstances, action) => {
  return previewInstances
}