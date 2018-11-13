import _ from 'lodash';
import { newTab } from '../tabs';

const handleNoTabCase = (tabs) => {
    if(_.isEmpty(tabs.allTabs)){
        //this is the part where it tries to create a size for the tab
        //for the time being, ignore this aspect;
        tabs = newTab(tabs,{data:undefined});
    }
    return tabs
}

export const addImageComponent = (tabs, action) => {
    tabs = handleNoTabCase(tabs);
    let domain = action.domain;
    let payload = action.payload;
    let target = { ...tabs.allTabs[domain.tabs.activeTab] };
    target.components = _.merge(target.components, {[payload.id]: payload})
    target.children.push(payload.id);
    return _.cloneDeep(tabs);
}

export const addComponent = (tabs,action) => {

    var t0 = performance.now();

    //add a tab if there is none
    tabs = handleNoTabCase(tabs)

    //unpack action
    let domain  = action.domain;
    let payload = action.payload;
    let target = { ...tabs.allTabs[domain.tabs.activeTab] };
    //target tab to add

    //add the root component to the existing children array.
    target.children.push(payload.id);

    let newTabs =  _.cloneDeep(tabs);

    var t1 = performance.now();
    console.log("Call to addComponent took " + (t1 - t0) + " milliseconds.")

    return newTabs;

}

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