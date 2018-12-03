// import { ReduxLeaf, ReduxBranch } from 'quo-redux/reduxWrapper';

import { State } from './state';

let reducer  = State.createMainReducer();

export default reducer

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


// class AppModeReducer extends ReduxLeaf {
//   __update = newAppMode => this.state + newAppMode
// }

// let appMode = new AppModeReducer({ slug: 'appmode', children: 'EDIT'})
// let user = new ReduxBranch({ slug: 'user', children: {}})

// let app = new ReduxBranch({
//   slug: 'app',
//   children: {
//     appMode,
//     user
//   }
// })

// let mainState = new ReduxBranch({
//   slug: 'root',
//   children: {
//     app
//   }
// })

// let selectors = mainState.createSelectors()
// let actions = mainState.createActions();
// let reducer = mainState.createMainReducer()

// export { mainState }
