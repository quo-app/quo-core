// @flow

import { Map } from 'immutable';

import { ReduxLeaf } from 'redux-shrub';

class LinkBuilderReducer extends ReduxLeaf {

  _newState = () => Map({
    source : '',
    target : '',
    linkId : '',
    enables : [],
    disables : [],
  })

  clear = state => payload => this._newState()

  update = state => payload => state.merge(payload)

}

let LinkBuilder = new LinkBuilderReducer({ slug: 'linkbuilder' })

export default LinkBuilder