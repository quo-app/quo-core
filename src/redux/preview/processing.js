import { ReduxLeaf } from 'redux-shrub';

class ProcessingReducer extends ReduxLeaf {
  _newState = () => false
  update = state => () => !state
}

let Processing = new ProcessingReducer({
  slug: 'processing',
})

export default Processing
