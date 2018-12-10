import { ReduxLeaf } from 'redux-shrub';

class StateTitleReducer extends ReduxLeaf {
  static initialState = ({ title }) => title
  __update = ({ title }) => title
}
const stateTitle = payload => new StateTitleReducer({
  slug: 'title',
  children: StateTitleReducer.initialState(payload)
})

export default stateTitle