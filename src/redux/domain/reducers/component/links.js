import _ from 'lodash';

// INIT
// set current link id in link builder
// update the link builder mode('sourceSelected')

// SOURCE_SELECTED
// set the target in link linkBuilder

// TARGET_SELECTED
// you can't link a component to itself => noop
// set the source in the link linkBuilder

// CREATE_LINK
// cleans the linkBuilder
// uses the information to populate the components
// the component should have a links tab with

// { linkid: { id: linkid, isSource, isTarget, trigger }}
// { triggers { onHover: [linkid1,linkid2] }, targets {linkid :component}
// }

export const setLinkSource = (components, action) => {

  if(!action.payload) return components

  let { linkId, source, target, enables, disables } = action.payload

  let sourceComponent = components[source]

  enables.forEach((event)=>{
    sourceComponent.links.triggers[event].push(target);
  })

  disables.forEach((event)=>{
    sourceComponent.links.disables[event].push(target);
  })

  sourceComponent.links.targetStateIds[target] = linkId;

  return {...components, [source]:_.cloneDeep(sourceComponent)};

}

export const setLinkTarget = (components, action) => {

  if(!action.payload) return components

  let { target, linkState } = action.payload

  let targetComponent = components[target];

  targetComponent.state.states[linkState.id] = linkState;

  return {...components, [target]:_.cloneDeep(targetComponent)};
}