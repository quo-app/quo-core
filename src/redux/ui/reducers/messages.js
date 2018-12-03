import { ReduxLeaf } from 'quo-redux/redux-wrapper'
import uuid from 'uuid/v1';

//     id:uuidv1(),
//     type: type,
//     text: text,
//     duration: duration,

// const messages = combineReducersLoop({
//   'ADD_MESSAGE': addMessage,
//   'REMOVE_MESSAGE': removeMessage,
// })

class MessagesReducer extends ReduxLeaf {

  static initialState = () => []

  __clear = MessagesReducer.initialState

  __add = messageData => this.state.slice().push(({ ...messageData, id:uuid()}))

  __remove = message => this.state.filter(item => message.id !== item.id)
}

let messages = new MessagesReducer({
  slug: 'messages',
  children: MessagesReducer.initialState()
})

export default messages
