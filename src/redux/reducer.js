// import { ReduxLeaf, ReduxBranch } from 'quo-redux/redux-wrapper';

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