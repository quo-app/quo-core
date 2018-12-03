import _ from 'lodash';
import { Map } from 'immutable';

class ReduxShell {
  constructor({ slug, children, isLeaf }) {
    this._type = isLeaf ? 'leaf' : 'branch'
    this.slug = slug
    this.children = children;
    this.reducerPrefix = '__';
    this.state = this._composeState(children)
  }
  // Public Methods
  showState = () => this.state instanceof Map ? this.state.toJS() : this.state

  createReducers = () => this._composeReducers(this.children);

  createActions = () => this._composeActions();

  createSelectors = () => this._flattenSelectors(this._composeSelectors(), state => state, {});

  createMainReducer = () => (state = this.state, action) => {
    let reducers = this.createReducers();
    let currentReducer = reducers[action.type];
    if(currentReducer && typeof currentReducer === 'function') return currentReducer(action.payload);
    else return this.state
  }

  // Private Methods
  _composeState = children => this._isLeaf() ? children : Map(_.mapValues(children, child => child.state))

  _composeReducers = children => this._isLeaf() ? this._getReducers() : _.merge(this._getChildrenReducers(children),this._getReducers())

  _composeActions = () => _.mapValues(this.createReducers(), (f, type) => (payload) => ({ payload, type }))

  _composeSelectors = () => this._isLeaf() ? this._composeLeafSelector() : this._composeBranchSelectors()

  _composeLeafSelector = () =>  state => state

  _composeBranchSelectors = () => _.mapValues(this.children, (v, k) => v._composeSelectors())

  _flattenSelectors = (selectors, currentSelector, collection = {} ) => {
    _.mapValues(selectors, (selector, key) => {
      let childSelector = state => currentSelector(state).get(key)
      return typeof selector !== 'function' ? this._flattenSelectors(selector, childSelector, _.merge(collection, { [key]: this._getSelfSelector(key)})) : _.merge(collection, { [key]: state => selector(childSelector(state)) })
    })
    return collection
  }

  _getSelfSelector = key => state => state.get(key)

  _getReducers = () => _.mapKeys(_.pick(this, this._findReducerKeys()), (v, k) => this._addSlug(k))

  _findReducerKeys = () => _.keys(this).filter(key =>_.startsWith(key, this.reducerPrefix));

  _addSlug = key => _.snakeCase(this.slug + key).toUpperCase()

  _getChildrenReducers = children => {
    let reducers = _.mapValues(children, (child, key) => _.mapValues(child.createReducers(), f => this._propagateState(f, key)))

    // version with long action types
    // let flattenedReducers  = _.values(reducers).reduce(_.merge, {})
    // return _.mapKeys(flattenedReducers, (v, k) => this._addSlug(k))

    // version with short action types
    return _.values(reducers).reduce(_.merge, {});
  }

  _propagateState = (reducer, key) => payload => {
    this.state = this.state.set(key, reducer(payload))
    return this.state
  }

  _isLeaf = () => this._type === 'leaf'
}

class ReduxLeaf extends ReduxShell {
  constructor(options){
    super({...options, isLeaf: true});
  }
}

class ReduxBranch extends ReduxShell {
  constructor(options){
    super({...options, isLeaf: false});
  }
}

export { ReduxLeaf, ReduxBranch }