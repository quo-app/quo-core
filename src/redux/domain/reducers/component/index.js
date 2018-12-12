// import _ from 'lodash';
// import { newTab } from '../tabs';


// const handleNoTabCase = (tabs) => {
//     if(_.isEmpty(tabs.allTabs)){
//         //this is the part where it tries to create a size for the tab
//         //for the time being, ignore this aspect;
//         tabs = newTab(tabs, {data: undefined});
//     }
//     return tabs
// }

// export const addImageComponent = (tabs, action) => {
//     tabs = handleNoTabCase(tabs);
//     let domain = action.domain;
//     let payload = action.payload;
//     let target = { ...tabs.allTabs[domain.tabs.activeTab] };
//     target.components = _.merge(target.components, {[payload.id]: payload})
//     target.children.push(payload.id);
//     return _.cloneDeep(tabs);
// }

// export const addComponent = (tabs,action) => {

//     //add a tab if there is none
//     tabs = handleNoTabCase(tabs)

//     //unpack action
//     let domain  = action.domain;
//     let payload = action.payload;
//     let target = { ...tabs.allTabs[domain.tabs.activeTab] };
//     //target tab to add

//     //add the root component to the existing children array.
//     target.children.push(payload.id);

//     let newTabs =  _.cloneDeep(tabs);

//     return newTabs;

// }

// export const removeComponent = (tabs,action) => {

//     let domain = action.domain;
//     let payload = action.payload;
//     let target = tabs.allTabs[domain.tabs.activeTab];
//     let component = target.components[payload.id];

//     //NOT WORKING YET!!!

//     let allTheComponentsToDelete = traverseAndAdd(component,target.components,{});
//     Object.keys(allTheComponentsToDelete).map( comp => {
//         delete target.components[comp.id]
//     })
//     return { ...tabs };
// }

// let states = new ReduxBranch({
//   slug: 'states',
//   children: {}
// })

// let stateGraph = new ReduxBranch({
//   slug: 'stategraph',
//   children: {}
// })

import { ReduxBranch, ReduxLeaf } from 'redux-shrub'

import title from './title'
import states from './states/index.js'
// import stateGraph from './stateGraph'
// import links from './links'

class ID extends ReduxLeaf {
  _newState = ({ id }) => id
}

class CoreProps extends ReduxLeaf {
  _newState = ( payload ) => ['these will be the core props']
}

let ComponentReducer = new ReduxBranch({
  slug: 'component',
  children: {
    id: new ID({ slug: 'id'}),
    title,
    states,
    _coreProps: new CoreProps({ slug: 'coreProps'}),
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

export default ComponentReducer