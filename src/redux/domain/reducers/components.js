import { ReduxPolyBranch, ReduxBranch, ReduxLeaf } from 'quo-redux/redux-wrapper';

// any reducer under a PolyBranch will have
// to unpack a payload since the keys used for
// reaching the subState are stored in the payload
// as well

class TitleReducer extends ReduxLeaf {
  static initialState = ({ title }) => title
  __update = ({ title }) => title
}

let title = payload => new TitleReducer({
  slug: 'title',
  children: TitleReducer.initialState(payload)
})

let states = new ReduxBranch({
  slug: 'states',
  children: {}
})

let stateGraph = new ReduxBranch({
  slug: 'stategraph',
  children: {}
})

let id = payload => new ReduxLeaf({
  children: payload.id
})

let _coreProps = payload => new ReduxLeaf({
  children: ['these will be the core props']
})

let ComponentReducer = payload => new ReduxBranch({
  slug: 'component',
  children: {
    id: id(payload),
    title: title(payload),
    stateGraph,
    states,
    _coreProps: _coreProps(payload)
  }
})

class ComponentsReducer extends ReduxPolyBranch {
  __add = payload => {
    // need to set it's own as only the parent gets updated
    let newComponent = this.childReducer(payload).state
    this.state = this.state.set(payload.id, newComponent);
    return this.state
   }
}

let components = new ComponentsReducer({
  slug: 'components',
  // all the components must be the same here.
  accessor: 'id',
  childReducer: ComponentReducer,
  children: {},
})

export default components