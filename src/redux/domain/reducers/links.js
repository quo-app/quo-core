import { ReduxPolyBranch } from 'redux-shrub';
import { Map } from 'immutable';

import accessors from 'quo-redux/accessors';
import stateReducer from './shared/stateReducer';


// this.links = {
//   add: {
//       onMouseEnter: [{id, states: { stateID: state, stateID2: state}],
//       onMouseDown: [],
//       onFocus: [],
//   },
//   remove: {
//       onMouseLeave: [],
//       onMouseUp: [],
//       onBlur: [],
//   }
// }

// this.links = {
//   linkId: {
//     state1,
//     state2,
//     state3
//   }
// }

const linkTarget = new ReduxPolyBranch({
  slug: 'linktarget',
  accessor: accessors.linkTarget,
  childReducer: stateReducer
})

const links = new ReduxPolyBranch({
  slug: 'links',
  accessor: accessors.linkSource,
  childReducer: linkTarget
})

export default links

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

// export const setLinkSource = (components, action) => {

//   if(!action.payload) return components

//   let { linkId, source, target, enables, disables } = action.payload

//   let sourceComponent = components[source]

//   enables.forEach((event)=>{
//     sourceComponent.links.triggers[event].push(target);
//   })

//   disables.forEach((event)=>{
//     sourceComponent.links.disables[event].push(target);
//   })

//   sourceComponent.links.targetStateIds[target] = linkId;

//   return {...components, [source]:_.cloneDeep(sourceComponent)};

// }

// export const setLinkTarget = (components, action) => {

//   if(!action.payload) return components

//   let { target, linkState } = action.payload

//   let targetComponent = components[target];

//   targetComponent.state.states[linkState.id] = linkState;

//   return {...components, [target]:_.cloneDeep(targetComponent)};
// }
