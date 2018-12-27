import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import selectors from 'quo-redux/selectors';
import actions from 'quo-redux/actions';

import { VerticalListCard } from 'quo-ui/cards';
import Icons from 'quo-ui/icons';
import { Button } from 'quo-ui/buttons';

class StatesHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownVisible: false,
      selected: this.props.currentState,
    }
  }

  onOptionClick = id => {
    this.props.dispatch(actions.CURRENT_STATE_UPDATE(id))
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    })
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
        headerMiddleText={ this.state.dropdownVisible ? null : this.props.states[this.props.currentState].text }
        onHeaderIconClick= { this.onHeaderIconClick }
        optionIconOrientation='left'
        selected={ this.props.currentState }
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
  const currentState = selectors.currentState(state)
  let convertedStates = _.mapValues(states, eachState => {
    return {
      text: eachState.title,
      icon: Object.keys(eachState.props).length > 0
    }
  })
  return {
    states: convertedStates,
    currentState
  }
}

const areStatesEqual = (next, prev) => {
  // this will only update if the selection has changed, or the
  // states of the selections have changed.

  /* currentState: string  */

  const prevCurrentState = selectors.currentState(prev)
  const nextCurrentState = selectors.currentState(next)

  if(prevCurrentState !== nextCurrentState) return false

  /*  selections: string[] */

  const prevSelections = selectors.selectedComponents(prev)
  const nextSelections = selectors.selectedComponents(next)

  if(!_.isEqual(prevSelections, nextSelections)) return false;

  /*  selections: map */

  const prevStates = selectors.componentStates(prev, { id: prevSelections[0]})
  const nextStates = selectors.componentStates(next, { id: nextSelections[0]})

  return prevStates.equals(nextStates)
}

export default connect(mapStateToProps, null, null, { areStatesEqual })(StatesHeader);
