import _ from 'lodash';
import { Map } from 'immutable'

const flattenLeavesOnly = (obj) => Object.assign({}, ...function _flatten(o) { return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})))}(obj))


class ReduxWrapper {
  constructor({ slug,
                includeSelfSelector = true,
                includeSlugInChildSelectors = false,
                includeSlugInChildReducers = false, }){
    this.slug = slug
    this.includeSelfSelector = includeSelfSelector
    this.includeSlugInChildSelectors = includeSlugInChildSelectors
    this.includeSlugInChildReducers = includeSlugInChildReducers
    this.selfPrefix = '_'
  }

  _composeSelfReducers = () => {
    let reducers = _.pick(this, this._findReducerKeys())
    let slugAddedReducers = _.mapKeys(reducers, (v, k) => this._addSnakeSlug(this.slug, k))
    return slugAddedReducers
  }

  _addSnakeSlug = (slug, key) => _.snakeCase(slug + '_' + key).toUpperCase()

  _addCamelSlug = (slug, key) => _.camelCase(slug + '_' + key)

  _findReducerKeys = () => _.keys(this).filter(key => !_.startsWith(key, this.selfPrefix) && typeof this[key] === 'function');

  _isBranch = () => this.type === 'branch';
  _isLeaf = () => this.type === 'leaf';
  _isPolyBranh = () => this.type === 'polyBranch';
}

class ReduxLeaf extends ReduxWrapper {
  constructor(props){
    super(props)
    this.type = 'leaf'
    this.initialState = props.initialState
  }

  _newState = () => this.initialState

  _composeSelectors = key => this.includeSelfSelector ? { [key]: (state, payload) => state } : {}

  _composeReducers = this._composeSelfReducers
}

class ReduxBranch extends ReduxWrapper {
  constructor(props){
    super(props)
    this.type = 'branch'
    this.children = props.children
  }

  _newState = (payload) => {
    return  Map(_.mapValues(this.children, (child, key) => {
      return child._newState(payload)
    }))
  }

  _composeReducers = () => {
    let childReducers = _.mapValues(this.children, child => child._composeReducers())
    let propagatedReducers = _.mapValues(childReducers, (reducers, key) => _.mapValues(reducers, reducer => {
        return state => payload => {
          let innerState = state.get(key)
          let newInnerState = reducer(innerState)(payload)
          return state.set(key, newInnerState)
      }
    }));
    propagatedReducers = flattenLeavesOnly(propagatedReducers)
    if(this.includeSlugInChildReducers){
      propagatedReducers = _.mapKeys(propagatedReducers, (v,k) => this._addSnakeSlug(this.slug, k))
    }
    return propagatedReducers
  }

  _composeSelectors = key => {
    let selfSelector = {}
    if(this.includeSelfSelector){
      selfSelector = ({ [key]: (state, payload) => state })
    }
    let allChildSelectors = _.mapValues(this.children,
      (child, childKey) => {
        let selectors = child._composeSelectors(childKey)
        selectors = _.mapValues(selectors, selector => {
          return (state, payload) => {
            return selector(state.get(childKey), payload)
          }
        })
        return selectors
      }
    )
    if(this.includeSlugInChildSelectors){
      allChildSelectors = _.mapKeys(allChildSelectors, (v,k) => this._addCamelSlug(this.slug, k));
    }
    return flattenLeavesOnly(_.merge(selfSelector, allChildSelectors))
  }
}

class ReduxRoot extends ReduxBranch {
  _createMainReducer = () => {
    let defaultState = this._newState();
    return (state = defaultState,  action) => {
      let reducers = this._composeReducers();
      let currentReducer = reducers[action.type];
      if(currentReducer && typeof currentReducer === 'function') return currentReducer(state)(action.payload);
      else return state
    }
  }

  _composeActions = () => _.mapValues(this._composeReducers(), (f, type) => (payload) => ({ payload, type }))

  _composeSelectors = () => {
    let allChildSelectors = _.mapValues(this.children,
    (child, childKey) => {
        let selectors = child._composeSelectors(childKey)
        selectors = _.mapValues(selectors, selector => {
          return (state, payload) => {
            return selector(state.get(childKey), payload)
          }
        })
        return selectors
      }
    )
    if(this.includeSlugInChildSelectors){
      allChildSelectors = _.mapKeys(allChildSelectors, (v,k) => this._addCamelSlug(this.slug, k));
    }
    return flattenLeavesOnly(allChildSelectors)
  }
}

class ReduxPolyBranch extends ReduxBranch {
  constructor(props){
    super(props);
    this.type = 'polyBranch'
    this.accessor = props.accessor
    this.childReducer = props.childReducer
    this.childSlug = this.childReducer.slug
  }

  add = state => payload => {
    let newElement = this.childReducer._newState(payload)
    let newId = payload[this.accessor]
    let newState =  state.set(newId, newElement)
    return newState
  }

  remove = state => payload => {
    let id = payload[this.accessor]
    let newState = state.delete(id);
    return newState
  }

  _newState = () => Map()

  _composeReducers = () => {
    let childReducers = this.childReducer._composeReducers()
    let propagatedReducers = _.mapValues(childReducers, (reducer, key) => {
        return state => payload => {
          let innerState = state.get(payload[this.accessor])
          let newInnerState = reducer(innerState)(payload)
          return state.set(payload[this.accessor], newInnerState)
      }
    });
    if(this.includeSlugInChildReducers){
      propagatedReducers = _.mapKeys(propagatedReducers, (v,k) => this._addSnakeSlug(this.slug, k))
    }
    return _.merge(this._composeSelfReducers(), propagatedReducers)
  }

  _composeSelectors = key => {
    let selfSelector = {}
    if(this.includeSelfSelector){
      selfSelector = ({ [key]: (state, payload) => state })
    }
    let childSelectors = this.childReducer._composeSelectors(this.childSlug)
    childSelectors = _.mapValues(childSelectors,
      (selector, childKey) => {
        return (state, payload) => {
          return selector(state.get(payload[this.accessor]), payload)
        }
      }
    )
    if(this.includeSlugInChildSelectors){
      childSelectors = _.mapKeys(childSelectors, (v,k) => this._addCamelSlug(this.slug, k));
    }
    return flattenLeavesOnly(_.merge(selfSelector, childSelectors))
  }

}

export { ReduxBranch, ReduxPolyBranch, ReduxLeaf, ReduxRoot }