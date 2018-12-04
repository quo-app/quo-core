import _ from 'lodash';
import { Map } from 'immutable';

class ReduxShell {
  constructor({ slug, children, type }) {
    this._type = type
    this.slug = slug
    this.children = children;
    this.reducerPrefix = '__';
    this.state = this._composeState(children)
  }
  // Public Methods
  showState = () => this.state instanceof Map ? this.state.toJS() : this.state

  createReducers = () => this._composeReducers(this.children);

  createActions = () => this._composeActions();

  createSelectors = () => this._flattenSelectors(this._composeSelectors(), (state, payload) => state, {});

  createMainReducer = () => (state = this.state, action) => {
    let reducers = this.createReducers();
    let currentReducer = reducers[action.type];
    if(currentReducer && typeof currentReducer === 'function') return currentReducer(action.payload);
    else return this.state
  }

  // Private Methods
  _composeState = children => this._isLeaf() ? children : Map(_.mapValues(children, child => child.state))

  _composeReducers = children => this._isLeaf() ? this._getReducers() : _.merge(this._getChildrenReducers(children), this._getReducers())

  _composeActions = () => _.mapValues(this.createReducers(), (f, type) => (payload) => ({ payload, type }))

  _composeSelectors = () => this._isLeaf() ? this._composeLeafSelector() : this._composeBranchSelectors()

  _composeLeafSelector = () =>  (state, payload) => state

  _composeBranchSelectors = () => _.mapValues(this.children, (v, k) => v._composeSelectors())

  _flattenSelectors = (selectors, currentSelector, collection = {} ) => {
    _.mapValues(selectors, (selector, key) => {
      let childSelector = (state, payload) => {
        // this is a workaround for not getting a key from a poly selector
        let currentState = currentSelector(state, payload);
        // this is the case when the key is a placeholder for a poly branch
        if(currentState.has(key)) return currentState.get(key)
        else return currentState
      }
      return typeof selector !== 'function' ? this._flattenSelectors(selector, childSelector, _.merge(collection, { [key]: this._getSelfSelector(key)})) : _.merge(collection, { [key]: (state, payload) => selector(childSelector(state, payload), payload)})
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
    super({...options, type: 'leaf'});
  }
}

class ReduxBranch extends ReduxShell {
  constructor(options){
    super({...options, type: 'branch'});
  }
}

class ReduxPolyBranch {
  constructor({ slug, children, childReducer, accessor, type = 'polyBranch' }) {
    this._type = type
    this.slug = slug
    this.children = children;
    this.childReducer = childReducer;
    this.reducerPrefix = '__';
    this.state = this._composeState(children)
    this.accessor = accessor;

    let childReducerTemp = childReducer({})
    this.childSlug = childReducerTemp.slug;
    this.childReducers = this._mapChildReducers(childReducerTemp.createReducers());
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
  _composeState = children => Map(_.mapValues(children, child => child.state))

  _composeReducers = children => _.merge(this._getReducers(), this.childReducers)

  _composeActions = () => _.mapValues(this.createReducers(), (f, type) => (payload) => ({ payload, type }))

  _composeSelectors = () =>  ({ [this.childSlug]: (state, payload) => {
    if(!payload[this.accessor]) return null;
      return state.get(payload[this.accessor])
    }
  })

  _flattenSelectors = (selectors, currentSelector, collection = {} ) => {
    _.mapValues(selectors, (selector, key) => {
      let childSelector = (state, payload) => {
        // this is a workaround for not getting a key from a poly selector
        let currentState = currentSelector(state, payload);
        // this is the case when the key is a placeholder for a poly branch
        if(currentState.has(key)) return currentState.get(key)
        else return currentState
      }
      return typeof selector !== 'function' ? this._flattenSelectors(selector, childSelector, _.merge(collection, { [key]: this._getSelfSelector(key)})) : _.merge(collection, { [key]: (state, payload) => {
        // console.log(state, payload, key)
        // console.log(childSelector(state, payload));
        return selector(childSelector(state, payload), payload)
      } })
    })
    return collection
  }

  _getSelfSelector = key => state => state.get(key)

  _getReducers = () => _.mapKeys(_.pick(this, this._findReducerKeys()), (v, k) => this._addSlug(k))

  _findReducerKeys = () => _.keys(this).filter(key =>_.startsWith(key, this.reducerPrefix));

  _addSlug = (key, slug= this.slug) => _.snakeCase(slug + key).toUpperCase()

  _getChildrenReducers = children => {
    let reducers = _.mapValues(children, (child, key) => _.mapValues(child.createReducers(), f => this._propagateState(f, key)))

    // version with long action types
    // let flattenedReducers  = _.values(reducers).reduce(_.merge, {})
    // return _.mapKeys(flattenedReducers, (v, k) => this._addSlug(k))

    // version with short action types
    return _.values(reducers).reduce(_.merge, {});
  }

  _propagateState = (reducer, key) => payload => {
    this.state = this.state.set(key, this.state.get(payload[this.accessor]).set(reducer(payload)))
    return this.state
  }

  _mapChildReducers = (childReducers) => {
    childReducers = _.mapValues(childReducers, (reducer,key) => payload => {
    // if there is no key to find, don't call the reducer
    if(!payload.id) return this.state
    this.state.set(payload[this.accessor], reducer(payload))
    return this.state
    })
    return _.mapKeys(childReducers, (reducer, key) => this._addSlug(key, this.childSlug))
  }
}


export { ReduxLeaf, ReduxBranch, ReduxPolyBranch }