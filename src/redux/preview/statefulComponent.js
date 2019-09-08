import { ReduxBranch, ReduxLeaf } from 'redux-shrub';
import { Set } from 'immutable';

class StateBags extends ReduxLeaf {
  _newState = () => new Set(['0']);
  add = (state) => ({ bagID }) => state.add(bagID)
}

class CurrentBag extends ReduxLeaf {
  _newState = () => '0'
  update = ({ current }) => current
}

let ComponentReducer = new ReduxBranch({
  slug: 'component',
  children: {
    stateBags: new StateBags({ slug: 'statebags' }),
    currentBag: new CurrentBag({ slug: 'currentStatebag '})
  },
  includeSlugInChildReducers: true,
  includeSlugInChildSelectors: true,
})

export default ComponentReducer
