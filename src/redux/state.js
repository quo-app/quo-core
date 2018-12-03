// // @flow
// import { Record } from 'immutable';

// const domain = {
//   // Uploads
//   assets:{
//     sketch:{},
//     image: {}
//   },
//   // Preview containers
//   previewInstances: {},
//   // Edited Components
//   components:{},
//   projects:{},
//   tabs:{
//     activeTab:'',
//     allTabs:{},
//     tabCount:0
//   }
// }

// type SelectionState = {
//   type: string,
//   data: string[],
//   editState: string,
//   details: Object,

// }

// const selection = {
//   type:'',
//   data:[],
//   editState:'',
//   details:{},
//   selectables:[]
// }

// const linkBuilder = {
//   mode:'INIT', // possible modes INIT, SOURCE_SELECTED, TARGET_SELECTED
//   linkId: '',
//   source: '',
//   target: '',
//   enables: [],
//   disables: [],
//   linkState: undefined,
// }

// const app = {
//   user:{},
//   appMode: 'EDIT',
//   linkBuilder,
//   selection,
// }

// const controller = {
//     key:{
//       // 'a':false,
//       // 'b':false,
//     }
//   }

// const sidebars = {
//   left:{
//     selected:'assets',
//     tabs:['assets','layers','globalLinks'],
//     width:230,
//   },
//   right:{
//     selected:'styles',
//     tabs:['styles','links','interactions'],
//   }
// }

// const messages = [];

// type StateManager = {
//   currentState: string
// }

// const stateManager:StateManager = {
//   currentState:'',
// }

// type UIState = {
//   controller: Object,
//   sidebars: Object,
//   messages: Object[],
//   stateManager: StateManager,
// }

// const ui:UIState = {
//   controller,
//   sidebars,
//   messages,
//   stateManager,
// }

// type State = {
//   domain: Object,
//   app: Object,
//   ui: UIState,
// }

// // const storeInitial:State = {
// //   domain,
// //   app,
// //   ui
// // }

import { ReduxBranch } from 'quo-redux/redux-wrapper';
import app from './app';
import ui from './ui';

const getState = (state: State, target: 'domain' | 'ui' | 'app') => {
  //later on, the main root(domain, app, ui) might be pushed
  //deeper in the tree, having to update mapStateToProps on
  //the components might be annoying so use this method instead.
  return state[target]
}



// const selection = {
//   type:'',
//   data:[],
//   editState:'',
//   details:{},
//   selectables:[]
// }

// const linkBuilder = {
//   mode:'INIT', // possible modes INIT, SOURCE_SELECTED, TARGET_SELECTED
//   linkId: '',
//   source: '',
//   target: '',
//   enables: [],
//   disables: [],
//   linkState: undefined,
// }

// const app = {
//   user:{},
//   appMode: 'EDIT',
//   linkBuilder,
//   selection,
// }

let State = new ReduxBranch({
  slug: 'root',
  children: {
    // app,
    ui
  }
})

// let selectors = mainState.createSelectors()
// let actions = mainState.createActions();
// let reducer = mainState.createMainReducer()

const constants = {
  appModes: ['EDIT','PREVIEW'],
}

export { State, constants, getState }
