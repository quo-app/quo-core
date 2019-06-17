import { Map } from 'immutable';
import { ReduxLeaf } from 'redux-shrub';
import { stat } from 'fs';

class Tab {
  constructor({ id, tabCount }){
    this.id = id
    this.title = `Tab ` + tabCount
    this.rootComponent = {
      id: id,
      type: 'parent',
      children: [],
      props: { x: 0, y: 0 }
    }
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

  // reducers
  add = state => ({ id }) => {
    if (!id) {
      throw new Error('an id:string needs to be provided')
    }
    state = state.setIn(['tabs', id], new Tab({ id, tabCount: state.get('tabCount')}))
    state = this.__updateCurrentTab(state, id)
    state = state.set('tabCount', state.get('tabCount') + 1)
    return state
  }

  addExisting = state => ({ id, rootComponent, title }) => {
    state = state.setIn(['tabs', id], new Tab({ id, tabCount: state.get('tabCount')}))
    state = state.set('tabCount', state.get('tabCount') + 1)
    state = this.editTitle(state)({ id, title })
    state = this._addRootComponent(state)({ id, rootComponent })
    return state
  }

  _addRootComponent = state => ({ id, rootComponent }) => {
    let tab = state.getIn(['tabs', id]);
    tab.rootComponent = rootComponent;
    state = state.setIn(['tabs', id], tab);
    return state
  }

  changeActive = state => ({ id }) => this.__updateCurrentTab(state, id)

  editTitle = state => ({ id, title }) => {
    let tab = state.getIn(['tabs', id]);
    let newTab = { ...tab, title };
    return state.setIn(['tabs', id], newTab);
  }

  addRootComponentToCurrent = state => ({ id, rootID }) => {
    if(!state.get('tabs').has(state.get('currentTab'))){
      state = this.add(state)({ id })
    }
    else {
      id = state.get('currentTab')
    }
    let tab = state.getIn(['tabs', id]);
    tab.rootComponent.children.push(rootID)
    let newTab = { ...tab, rootComponent: { ...tab.rootComponent } };
    state = state.setIn(['tabs', id], newTab);
    return state
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
