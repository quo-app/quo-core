import React, { Component } from 'react';

import { VerticalListCard } from 'quo-ui/cards';
import { Button } from 'quo-ui/buttons';

class LinksDropdown extends Component {
  state = {
    dropdownCollapsed: true
  }
  render = () => {
    const { links } = this.props;
    return (
      <div className='links-header'>
        <VerticalListCard
          title='Links'
          // optionIcon={ }
          collapsed={ this.state.dropdownCollapsed }
          // headerIcon={ this.decideMinimizeIcon() }
          // headerMiddleText={ this.state.dropdownVisible ? null : this.props.states[this.props.currentState].text }
          // onHeaderIconClick= { this.onHeaderIconClick }
          optionIconOrientation='left'
          // selected={ }
          values={ links }
          // onOptionClick={ this.onOptionClick }
        />
        {
          this.state.dropdownCollapsed ? null
          : <Button>
          Create a new link
        </Button>
        }

      </div>
    )
  }
}

export default LinksDropdown