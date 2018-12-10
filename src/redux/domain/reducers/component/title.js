import { ReduxLeaf } from 'redux-shrub';

class TitleReducer extends ReduxLeaf {
  _newState = ({ title }) => title
  update = state => ({ title }) => title
}

let title = new TitleReducer({ slug: 'title' })

export default title