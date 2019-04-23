import { ReduxLeaf } from 'redux-shrub';

class ProjectIdReducer extends ReduxLeaf {
  _newState = id => id
  update = state => id => id
}

const projectId = new ProjectIdReducer({ slug: 'projectId' })

export default projectId