import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { VerticalListCard } from 'quo-ui/cards';
import { Button } from 'quo-ui/buttons';
import Icons from 'quo-ui/icons';

import actions from 'quo-redux/actions';

class LinksDropdown extends Component {
  state = {
    dropdownCollapsed: true
  }

  transformLinksForDropdown = (links) => {
    return _.mapValues(links, link => {
      let returnObj = {};
      returnObj.text = link.title
      return returnObj
    })
  }

  onHeaderIconClick = () => {
    this.setState({ dropdownCollapsed: !this.state.dropdownCollapsed })
  }

  decideMinimizeIcon = () => {
    return this.state.dropdownCollapsed ? <Icons.KeyboardArrowDown/> : <Icons.KeyboardArrowUp/>
  }

  addNewLink = () => {
    const { dispatch } = this.props;
    if(this.props.id) {
      dispatch(actions.LINKS_ADD_NEW({ linkSource: this.props.id }))
    }
  }

  render = () => {
    const { links, linkID, onSelection } = this.props;
    const mappedLinks = this.transformLinksForDropdown(links);
    const headerMiddleText = linkID && Object.keys(links).lenght > 0 ? links[linkID].title : 'no links'
    return (
      <div className='links-header'>
        <VerticalListCard
          title='Links'
          // optionIcon={ }
          collapsed={ this.state.dropdownCollapsed }
          headerIcon={ this.decideMinimizeIcon() }
          headerMiddleText={ headerMiddleText  }
          onHeaderIconClick= { this.onHeaderIconClick }
          optionIconOrientation='left'
          selected={ linkID }
          values={ mappedLinks }
          onOptionClick={ onSelection }
        />
        {
          this.state.dropdownCollapsed ? null
          : <Button onClick={this.addNewLink}>
          Create a new link
        </Button>
        }

      </div>
    )
  }
}

LinksDropdown = connect()(LinksDropdown)

export default LinksDropdown