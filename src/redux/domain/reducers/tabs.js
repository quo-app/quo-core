import { Map } from 'immutable';
import { ReduxLeaf } from 'redux-shrub';

class Tab {
  constructor({id, tabCount, rootComponent}){
    this.id = id
    this.title = `Tab ` + tabCount
    this.rootComponent = rootComponent
  }
}

class TabsReducer extends ReduxLeaf {
  _newState = () => Map({
    tabs: Map({}),
    currentTab: '',
    tabCount: 0
  })

  // private methods
  __updateCurrentTab = (state, id) => state.set('currentTab', id)

  __addTab = (state, id, tab) => state.setIn(['tabs', id], tab)

  __incrementTabCount = state => {
    let tabCount = state.get('tabCount')
    return state.set('tabCount', tabCount + 1)
  }

  // reducers
  add = state => payload => {
    state = this.__addTab(state, payload.id, new Tab({...payload, tabCount: state.get('tabCount')}))
    state = this.__updateCurrentTab(state, payload.id)
    state = this.__incrementTabCount(state)
    return state
  }

  changeActive = state => ({ id }) => this.__updateCurrentTab(state, id)

  editTitle = state => ({ id, title }) => {
    let tab = state.getIn(['tabs', id]);
    let newTab = { ...tab, title };
    return state.setIn(['tabs', id], newTab);
  }

  editRoot = state => ({ id, root }) => {
    let tab = state.getIn(['tabs', id]);
    let newTab = { ...tab, rootComponent: root };
    return state.setIn(['tabs', id], newTab);
  }

  remove = state => ({ id })=> {
    state = state.deleteIn(['tabs', id])
    if(id === state.get('currentTab')){
      let tabs = state.get('tabs')
      if(tabs.isEmpty()){
        state = this.__updateCurrentTab(state, '')
      }
      else {
        state = this.__updateCurrentTab(state, tabs.last())
      }
    }
    return state
  }
}

const tabs = new TabsReducer({ slug: 'tabs' })

export default tabs
