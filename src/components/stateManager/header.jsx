import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectors from 'quo-redux/selectors';

import _ from 'lodash';

import { VerticalListCard } from 'quo-ui/cards';
import Icons from 'quo-ui/icons';
import { Button } from 'quo-ui/buttons';

class StatesHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownVisible: false,
      selected: 'default',
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
        headerMiddleText={ this.state.dropdownVisible ? null : this.props.states[this.state.selected].text }
        onHeaderIconClick= { this.onHeaderIconClick }
        optionIconOrientation='left'
        selected={ this.state.selected }
        values={ this.props.states }
        onOptionClick={ this.onOptionClick }
      />
    )
  }

  render(){
    return (
      <React.Fragment>
        { this.renderDropdown() }
        { this.state.dropdownVisible ? <Button>Create a new state</Button> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  let selections = selectors.selectedComponents(state)
  let states = selectors.componentStates(state, { id: selections[0]}).toJS()
  let convertedStates = _.mapValues(states, eachState => {
    return { text: eachState.title, icon: eachState.active }
  })

  console.log(convertedStates)

  return {
    states: convertedStates
  }
}

export default connect(mapStateToProps)(StatesHeader);
