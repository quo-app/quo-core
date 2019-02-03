import { ReduxLeaf, createReduxBranch } from 'redux-shrub';
import { Set } from 'immutable';

class EventsReducer extends ReduxLeaf {
  add = state => ({ event }) => state.add(event)
  change = state => ({ events }) => Set(events)
  remove = state => ({ event }) => state.delete(event)
}

class AddEventsReducer extends EventsReducer {
  _newState = ({ addEvents }) => Set(addEvents ? addEvents : [])
}

class RemoveEventsReducer extends EventsReducer {
  _newState = ({ removeEvents }) => Set(removeEvents ? removeEvents : [])
}

const addEvents = new AddEventsReducer({ slug: 'addEvents' })

const removeEvents = new RemoveEventsReducer({ slug: 'removeEvents' })

const events = createReduxBranch('events', {
  addEvents,
  removeEvents,
})

export default events