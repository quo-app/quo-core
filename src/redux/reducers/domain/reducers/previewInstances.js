export const createPreviewInstance = (previewInstances, action) => {
  let { components, id} = action;
  previewInstances[id] = {};
  previewInstances[id].components = 'asd';
}