import { ReduxLeaf } from 'redux-shrub'
import uuid from 'uuid/v1';
import { Map } from 'immutable';

//     id:uuidv1(),
//     type: type,
//     text: text,
//     duration: duration,

class Message {
  constructor({ id, type, text, duration }){
    this.id = id
    this.type = type
    this.text = text
    this.duration = duration
  }
}

class MessagesReducer extends ReduxLeaf {

  _newState = () => Map()

  clear = state => payload => this._newState()

  add = state => messageData => {
    let id = uuid()
    let newMessage = new Message({ ...messageData, id})
    state = state.set(id, newMessage)
    return state
  }
  remove = state => message => state.delete(message.id)
}

let messages = new MessagesReducer({
  slug: 'messages'
})

export default messages
