import { ReduxLeaf } from 'quo-redux/redux-wrapper';

class AppModeReducer extends ReduxLeaf {
  static initialState = () => 'EDIT'
  __setEdit = () => 'EDIT'
  __setPreview = () => 'PREVIEW'
}

let appMode = new AppModeReducer({ slug: 'appmode', children: AppModeReducer.initialState()})

export default appMode