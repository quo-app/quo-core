import { createReduxBranch } from 'redux-shrub';
import components from './reducers/components';
import assets from './reducers/assets';
import tabs from './reducers/tabs';
import previews from './reducers/previews';
import links from './reducers/links';

const domain = createReduxBranch('domain', {
  components,
  previews,
  links,
  assets,
  tabs,
})

export default domain
