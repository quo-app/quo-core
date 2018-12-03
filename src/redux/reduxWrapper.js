import { Map } from 'immutable';
import _ from 'lodash';
import { selector } from 'postcss-selector-parser';

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

  createSelectors = () => this._flattenSelectors(this._composeSelectors());

  createMainReducer = () => (state = this.state, action) => {
    let reducers = this.createReducers();
    let currentReducer = reducers[action.type];
    if(currentReducer && typeof currentReducer === 'function') return currentReducer(action.payload);
    else return this.state
  }

  // Private Methods
  _composeState = children => this._isLeaf() ? children : Map(_.mapValues(children, child => child.state))

  _composeReducers = children => this._isLeaf() ? this._getReducers() : _.merge(this._getChildrenReducers(children),this._getReducers())

  _composeActions = () => _.mapValues(this.createReducers(), (type, f) => (payload) => ({ payload, type }))

  _composeSelectors = () => this._isLeaf() ? this._composeLeafSelector() : this._composeBranchSelectors()

  _composeLeafSelector = () =>  () => this.state

  _composeBranchSelectors = () => _.mapValues(this.children, v => v._composeSelectors())

  _flattenSelectors = (selectors, collection = {}) => {
    _.mapValues(selectors, (selector, key) => typeof selector !== 'function' ? this._flattenSelectors(selector, collection) : _.merge(collection, { [key]: selector}))
    return collection
  }

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