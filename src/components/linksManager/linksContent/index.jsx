import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HorizontalOptionGroup from 'quo-ui/horizontalOptionGroup'
import { DropdownCard } from 'quo-ui/cards';
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

  state = {
    selected: '0',
    options: {
      0: { text: 'Action In', method: 'renderActionIn' },
      1: { text: 'Action Out', method: 'renderActionOut' }
    }
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

  renderActionIn = () => {
    return (
      <Fragment key='1'>
        <DropdownCard options={{'a':'Click', 'b':'Hover'}} title="Trigger" defaultValue='a'/>
        <DropdownCard options={{'a':'Close when clicking outside', 'b':'Hover'}} title="Target Area" defaultValue='a'/>
        <DropdownCard options={{'a':'appears', 'b':'Hover'}} title="Action" defaultValue='a'/>
      </Fragment>
    )
  }

  renderActionOut = () => {
    return (
      <Fragment key='2'>
        <DropdownCard options={{'a':'Click', 'b':'Hover'}} title="Trigger" defaultValue='a'/>
        <DropdownCard options={{'a':'Close when clicking outside', 'b':'Hover'}} title="Target Area" defaultValue='a'/>
        <DropdownCard options={{'a':'appears', 'b':'Hover'}} title="Action" defaultValue='a'/>
      </Fragment>
    )
  }

  renderLinkBuilder = () => {
    return (
      <Fragment>
        <PrimarySelectionBox id={this.props.id}/>
        <LinkedSelectionBox id={this.props.id} targets={this.props.link.targets}/>
        <HorizontalOptionGroup
          selected={ this.state.selected }
          options={ this.state.options }
          onChange={ id => this.setState({selected: id})}
        />
        {
          this[this.state.options[this.state.selected].method]()
        }
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