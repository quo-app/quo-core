import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import LinksDropdown from './linksDropdown';

import { PrimarySelectionBox,
         LinkedSelectionBox } from './selectionBox';

class LinksManager extends Component {
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
        <PrimarySelectionBox/>
        <LinkedSelectionBox/>
      </Fragment>
    )
  }

  renderContent = () => {
    const { links } = this.props;
    return (
      <div className='links-content'>
        {
          Object.keys(links).length === 0
          ?
            this.renderEmpty()
          :
            this.renderLinkBuilder()
        }
      </div>
    )
  }

  render = () => {
    return (
      <div className='links-wrapper'>
        <LinksDropdown links={this.props.links}/>
        { this.renderContent() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  // retrieve links and shove them in to the
  // links
  return { links: {} }
}

export default connect(mapStateToProps)(LinksManager)