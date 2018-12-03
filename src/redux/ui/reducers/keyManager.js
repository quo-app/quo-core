import { ReduxBranch, ReduxLeaf } from 'quo-redux/redux-wrapper'
import { Map } from 'immutable'

// const controller = {
//     key:{
//       // 'a':false,
//       // 'b':false,
//     }
//   }

class KeyReducer extends ReduxLeaf {
  static initialState = () => Map({})
  __down = keyCode => this.state.set(keyCode, true)
  __up = keyCode => this.state.delete(keyCode)
}

let key = new KeyReducer({
  slug: 'key',
  children: KeyReducer.initialState()
})

let keyManager = new ReduxBranch({
  slug: 'keymanager',
  children: {
    key
  }
})

export default keyManager
