import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from  'quo-redux/actions';
import HorizontalOptionGroup from 'quo-ui/horizontalOptionGroup'
import { DropdownCard } from 'quo-ui/cards';
import { PrimarySelectionBox,
  LinkedSelectionBox } from '../selectionBox';

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

  actionIntoPropsMapping = {
    show: { opacity: 0 }
  }

  onAddEventChange = key => {
    this.props.dispatch(actions.LINK_ADD_EVENTS_CHANGE({
      linkSource: this.props.id,
      linkID: this.props.link.id,
      events: [key]
     }));
  }

  onRemoveEventChange = key => {
    this.props.dispatch(actions.LINK_REMOVE_EVENTS_CHANGE({
      linkSource: this.props.id,
      linkID: this.props.link.id,
      events: [key]
     }));
  }

  onActionInActionChange = key => {
    const props = this.actionIntoPropsMapping[key]
    this.props.dispatch(actions.LINK_PROPS_REPLACE({
      linkSource: this.props.id,
      linkID: this.props.link.id,
      props: props
    }))
  }

  renderActionIn = () => {
    return (
      <Fragment key='1'>
        <DropdownCard options={{'initial':'Initially applied', 'onMouseUp':'Click', 'onMouseEnter':'Hover'}} title="Trigger" defaultValue='initial' onChange={this.onAddEventChange}/>
        {/* <DropdownCard options={{'outside':'Close when clicking outside', 'b':'Hover'}} title="Target Area" defaultValue='a'/> */}
        <DropdownCard options={{'show':'appears'}} title="Action" defaultValue='show' onChange={this.onActionInActionChange}/>
      </Fragment>
    )
  }

  renderActionOut = () => {
    return (
      <Fragment key='2'>
        <DropdownCard options={{'onMouseDown':'Click', 'onMouseEnter':'Hover', 'focusOut': 'Click Outside'}} title="Trigger" defaultValue='onMouseDown' onChange={this.onRemoveEventChange}/>
        {/* <DropdownCard options={{'a':'Close when clicking outside', 'b':'Hover'}} title="Target Area" defaultValue='a'/> */}
        <DropdownCard options={{'hide':'disappears'}} title="Action" defaultValue='hide'/>
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

LinksContent = connect()(LinksContent)

export default LinksContent