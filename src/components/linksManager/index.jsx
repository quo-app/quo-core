import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { PrimarySelectionBox,
         LinkedSelectionBox } from './selectionBox';

class LinksManager extends Component {
  render () {
    return (
      <Fragment>
        <PrimarySelectionBox/>
        <LinkedSelectionBox/>
      </Fragment>
    )
  }
}

export default connect()(LinksManager)