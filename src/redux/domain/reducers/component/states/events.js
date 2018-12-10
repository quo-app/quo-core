import { ReduxLeaf, ReduxBranch } from 'redux-shrub';
import { Set } from 'immutable';

class EventsReducer extends ReduxLeaf {
  __add = ({ event }) => this.state.set(event)
  __remove = ({ event }) => this.state.delete(event)
}

class AddEventsReducer extends EventsReducer {
  static initialState = ({ addEvents }) => Set(addEvents ? addEvents : [])
}

class RemoveEventsReducer extends EventsReducer {
  static initialState = ({ removeEvents }) => Set(removeEvents ? removeEvents : [])
}

const addEvents = payload => new AddEventsReducer({
  slug: 'addEvents',
  children: AddEventsReducer.initialState(payload)
})

const removeEvents = payload => new RemoveEventsReducer({
  slug: 'removeEvents',
  children: RemoveEventsReducer.initialState(payload)
})

const events = payload => new ReduxBranch({
  slug: 'events',
  children: {
    addEvents: addEvents(payload),
    removeEvents: removeEvents(payload)
  }
})

export default events