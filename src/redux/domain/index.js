import { createReduxBranch } from 'redux-shrub';
import components from './reducers/components';
import assets from './reducers/assets';
import tabs from './reducers/tabs';
import previews from './reducers/previews';
import links from './reducers/links';
import projectId from './reducers/projectId';

const domain = createReduxBranch('domain', {
  projectId,
  components,
  previews,
  links,
  assets,
  tabs,
})

export default domain
