import { createReduxBranch, ReduxLeaf } from 'redux-shrub'
import { Set } from 'immutable'

class KeysReducer extends ReduxLeaf {
  //Example state
  // {
  //  'cmd': true,
  //  'enter': true,
  // }
  _newState = () => Set()
  down = state => keyCode => state.set(keyCode)
  up = state => keyCode => state.delete(keyCode)
}

let keys = new KeysReducer({
  slug: 'keys',
})

let keyManager = createReduxBranch('keymanager', { keys })

export default keyManager
