import uuid from 'uuid/v1';
import { Map } from 'immutable';
import { ReduxLeaf, ReduxBranch, ReduxPolyBranch } from 'quo-redux/redux-wrapper';

// let ComponentReducer = payload => new ReduxBranch({
//   slug: 'component',
//   children: {
//     id: id(payload),
//     title: title(payload),
//     stateGraph,
//     states,
//     _coreProps: _coreProps(payload)
//   }
// })

// const TabsReducer = payload => new ReduxLeaf({
//   slug: 'tab',
//   children: { id: payload.id }
// })
class Tab {
  constructor({id, tabCount, rootComponent}){
    this.id = id
    this.title = `Tab ` + tabCount
    this.rootComponent = rootComponent
  }
}

class TabsReducer extends ReduxLeaf {
  static initialState = () => Map({
    tabs: Map({}),
    currentTab: '',
    tabCount: 0
  })

  //getters
  get tabs() { return this.state.get('tabs') }
  get tabCount() { return this.state.get('tabCount') }

  // private methods
  updateCurrentTab = id => {
    this.state = this.state.set('currentTab', id)
  }

  addTab = (id, tab) => {
    this.state = this.state.setIn(['tabs', id], tab)
  }

  incrementTabCount = () => {
    this.state = this.state.set('tabCount', this.tabCount + 1)
  }

  // reducers
  __add = payload => {
    this.addTab(payload.id, new Tab({...payload, tabCount: this.tabCount}))
    this.updateCurrentTab(payload.id)
    this.incrementTabCount()
    return this.state
  }

  __change_active = ({ id }) => {
    this.state = this.state.set('currentTab', id)
    return this.state;
  }

  __edit_title = ({ id, title }) => {
    let newTab = { ...this.tabs.get(id), title };
    this.state = this.state.setIn(['tabs', id], newTab);
    return this.state;
  }

  __edit_root = ({ id, root }) => {
    let newTab = { ...this.tabs.get(id), rootComponent: root };
    this.state = this.state.setIn(['tabs', id], newTab);
    return this.state;
  }

  __remove = ({ id })=> {
    this.state = this.state.deleteIn(['tabs', id])
    if(id === this.state.get('currentTab')){
      if(this.tabs.isEmpty()){
        this.updateCurrentTab('')
      }
      else {
        this.updateCurrentTab(this.tabs.last())
      }
    }
    return this.state
  }
}

const tabs = new TabsReducer({
  slug: 'tabs',
  children: TabsReducer.initialState(),
})

// const newTab = (tabs,action) => {

//   let newTab = {
//     id:uuidv1().toUpperCase(),
//     name:`Tab ${tabs.tabCount}`,
//     components:action.payload ? action.payload : {},
//     children:[],
//     tabCount:tabs.tabCount
//   }
//   //add it to the list of tabs
//   tabs.allTabs[newTab.id] = newTab;

//   //switch the active tab to the new tab
//   tabs.activeTab = newTab.id;

//   // increment the tabCount
//   tabs.tabCount += 1;

//   return { ...tabs }
// }

// const changeActiveTab = (tabs,action) => {
//   let newTabs = { ...tabs };
//   newTabs.activeTab = action.payload.id;
//   return newTabs
// }

// const editTab = (tabs,action) => {

//   tabs.allTabs[action.payload.id] = action.payload;
//   return { ...tabs };

// }

// const deleteTab = (tabs,action) => {
//   //if tab exists
//   if(action.payload && tabs.allTabs[action.payload.id]){
//       //get rid of the tab data
//       delete tabs.allTabs[action.payload.id];
//       if(tabs.activeTab === action.payload.id){
//         let tabIds = Object.keys(tabs.allTabs);
//         //if it was the last tab, set active tab to empty
//         if(tabIds.length === 0){
//           tabs.activeTab = '';
//         }
//         else{
//           tabs.activeTab = tabIds[0];
//         }
//       }
//   }
//   //noop
//   return tabs;
// }

// export { newTab, changeActiveTab, editTab, deleteTab }

export default tabs
