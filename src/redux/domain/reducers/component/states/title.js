import { ReduxLeaf } from 'redux-shrub';

class StateTitleReducer extends ReduxLeaf {
  _newState = ({ title }) => title
  update = state => ({ title }) => title
}
const stateTitle = new StateTitleReducer({ slug: 'title' })

export default stateTitle