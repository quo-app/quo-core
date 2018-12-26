import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import selectors from 'quo-redux/selectors';

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
  return {
    states: convertedStates
  }
}

const areStatesEqual = (next, prev) => {
  // this will only update if the selection has changed, or the
  // states of the selections have changed.

  /*  selections : string[] */

  const prevSelections = selectors.selectedComponents(prev)
  const nextSelections = selectors.selectedComponents(next)

  if(!_.isEqual(prevSelections, nextSelections)) return false;

  /*  selections : map */

  const prevStates = selectors.componentStates(prev, { id: prevSelections[0]})
  const nextStates = selectors.componentStates(next, { id: nextSelections[0]})

  return prevStates.equals(nextStates)
}

export default connect(mapStateToProps, null, null, { areStatesEqual })(StatesHeader);
