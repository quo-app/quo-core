import { ReduxLeaf } from 'redux-shrub';

class AppModeReducer extends ReduxLeaf {
  _newState = () => 'EDIT'
  setEdit = state => payload => 'EDIT'
  setPreview = state => payload => 'PREVIEW'
}

let appMode = new AppModeReducer({ slug: 'appmode' })

export default appMode