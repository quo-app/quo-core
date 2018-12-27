import { ReduxLeaf, createReduxBranch } from 'redux-shrub'
import { Map } from 'immutable';

// const sidebars = combineReducersLoop({
//   'UPDATE_SIDEBAR_TAB': updateTab,
//   'RESIZE_SIDEBAR': resizeSidebar,
// })

class SidebarReducer extends ReduxLeaf {
  selected_update = state => newSelected => state.set('selected', newSelected)
  width_update = state => newWidth => state.set('width', newWidth)
}

let leftSidebar = new SidebarReducer({
  slug: 'leftSidebar',
  initialState: Map({
    selected: 'assets',
    tabs: ['assets', 'layers', 'globalLinks'],
    width: 230
  })
})

let rightSidebar = new SidebarReducer({
  slug: 'rightSidebar',
  initialState: Map({
    selected: 'styles',
    tabs: ['styles','links','interactions'],
  })
})

let sidebars = createReduxBranch('sidebars', {
  leftSidebar,
  rightSidebar
})

export default sidebars
