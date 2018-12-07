import { ReduxLeaf } from 'quo-redux/redux-wrapper'
import uuid from 'uuid/v1';
import { Map } from 'immutable';

//     id:uuidv1(),
//     type: type,
//     text: text,
//     duration: duration,

// const messages = combineReducersLoop({
//   'ADD_MESSAGE': addMessage,
//   'REMOVE_MESSAGE': removeMessage,
// })

class Message {
  constructor({ id, type, text, duration }){
    this.id = id
    this.type = type
    this.text = text
    this.duration = duration
  }
}

class MessagesReducer extends ReduxLeaf {

  static initialState = () => Map()

  __clear = MessagesReducer.initialState

  __add = messageData => {
    let id = uuid()
    let newMessage = new Message({ ...messageData, id})
    this.state = this.state.set(id, newMessage)
    console.log(this.state);
    return this.state
  }
  __remove = message => {
    this.state = this.state.delete(message.id)
    return this.state
  }
}

let messages = new MessagesReducer({
  slug: 'messages',
  children: MessagesReducer.initialState()
})

export default messages
