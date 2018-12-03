// @flow

import { Map } from 'immutable';

import { ReduxLeaf } from 'quo-redux/redux-wrapper';

class LinkBuilderReducer extends ReduxLeaf {

  static initialState = () => Map({
    source : '',
    target : '',
    linkId : '',
    enables : [],
    disables : [],
  })

  __clear = () => LinkBuilderReducer.initialState()

  __update = payload => this.state.merge(payload)

}

let LinkBuilder = new LinkBuilderReducer({
  slug: 'linkbuilder',
  children: LinkBuilderReducer.initialState(),
})

export default LinkBuilder