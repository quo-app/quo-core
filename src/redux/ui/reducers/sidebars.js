import { ReduxLeaf, ReduxBranch } from 'quo-redux/redux-wrapper'
import { Map } from 'immutable';

class SidebarReducer extends ReduxLeaf {
  __selected_update = newSelected => this.state.set('selected', newSelected)
  __width_update = newWidth => this.state.set('width', newWidth)
}

let leftSidebar = new SidebarReducer({
  slug: 'leftSidebar',
  children: Map({
    selected: 'assets',
    tabs: ['assets', 'layers', 'globalLinks'],
    width: 230
  })
})

let rightSidebar = new SidebarReducer({
  slug: 'rightSidebar',
  children: Map({
    selected: 'styles',
    tabs: ['styles','links','interactions'],
  })
})

let sidebars = new ReduxBranch({
  slug: 'sidebars',
  children: {
    leftSidebar,
    rightSidebar
  }
})

export default sidebars

// const sidebars = combineReducersLoop({
//   'UPDATE_SIDEBAR_TAB': updateTab,
//   'RESIZE_SIDEBAR': resizeSidebar,
// })

//   left:{
//     selected:'assets',
//     tabs:['assets','layers','globalLinks'],
//     width:230,
//   },
//   right:{
//     selected:'styles',
//     tabs:['styles','links','interactions'],
//   }
