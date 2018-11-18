import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';

import { VerticalListCard } from 'quo-ui/cards';
import Icons from 'quo-ui/icons';
import { Button } from 'quo-ui/buttons';

class StatesHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownVisible: false,
      selected: '0',
      states: {
        0: {text: 'Default', icon: true},
        1: {text: 'Hover', id:'2'},
        2: {text: 'Pressed', id:'3'},
        3: {text: 'Click', id:'4'}
      }
    }
  }

  onOptionClick = id => {
    this.setState({ selected: id})
  }

  onHeaderIconClick = () => {
    this.setState({dropdownVisible: !this.state.dropdownVisible});
  }

  decideMinimizeIcon = () => {
    return this.state.dropdownVisible ? <Icons.KeyboardArrowUp/> : <Icons.KeyboardArrowDown/>
  }

  renderDropdown = () => { 
    return (
      <VerticalListCard
        title='States'
        optionIcon={ <Icons.Check/> }
        collapsed={ !this.state.dropdownVisible }
        headerIcon={ this.decideMinimizeIcon() }
        headerMiddleText={ this.state.dropdownVisible ? null : this.state.states[this.state.selected].text }
        onHeaderIconClick= { this.onHeaderIconClick }
        optionIconOrientation='left'
        selected={ this.state.selected }
        values={ this.state.states }
        onOptionClick={ this.onOptionClick }
      />
    )
  }

  render(){
    return ( 
      <React.Fragment>
        { this.renderDropdown() }
        { this.state.dropdownVisible ? <Button>Create a new link</Button> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { }
}

export default connect(mapStateToProps)(StatesHeader);
