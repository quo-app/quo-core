import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { PrimarySelectionBox,
  LinkedSelectionBox } from '../selectionBox';

// displayEmpty = false
// link = {}

class LinksContent extends Component {
  static propTypes = {
    displayEmpty: PropTypes.bool,
    link: PropTypes.object
  }

  static defaultProps = {
    displayEmpty: true,
    link: {}
  }

  renderEmpty = () => {
    return (
      <div className='no-link-description'>
        <div className='text-primary'>
          No links found
        </div>
        <div className='text-secondary'>
          Create a new link to connect components
        </div>
      </div>
    )
  }

  renderLinkBuilder = () => {
    return (
      <Fragment>
        <PrimarySelectionBox link={this.props.link}/>
        <LinkedSelectionBox/>
      </Fragment>
    )
  }

  render = () => {
    const { displayEmpty } = this.props;
    return (
      <div className='links-content'>
        {
          displayEmpty
          ?
            this.renderEmpty()
          :
            this.renderLinkBuilder()
        }
      </div>
    )
  }
}

export default LinksContent