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
      dropdownVisible: true,
      selected: props.states['0']
    }
  }

  onOptionClick = id => {
    this.setState({ selected: this.props.states[id]});
    // const { dispatch } = this.props;
    // dispatch(actions.STATE_MANAGER_UPDATE({
    //   currentState: option.text,
    // }))
  }

  onHeaderIconClick = () => {
    this.setState({dropdownVisible: !this.state.dropdownVisible});
  }

  // onBackIconClick = () => {
    // this.setState({dropdownVisible: true, selected: null });
  //   const { dispatch } = this.props;
  //   dispatch(actions.STATE_MANAGER_UPDATE({
  //     currentState:'',
  //   }))
  // }

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
        headerMiddleText={ this.state.selected.text }
        onHeaderIconClick= { this.onHeaderIconClick }
        optionIconOrientation='left'
        values={ this.props.states }
        onOptionClick={ this.onOptionClick }
      />
    )
  }

  // renderSelectedView = () => {
  //   return (
  //     <div className='selected-state-wrapper'>
  //       <div className='back-icon' onClick={ this.onBackIconClick }> 
  //         <Icons.Reply/> 
  //       </div>
  //       <div className='state-text'> { this.state.selected.text }</div>
  //     </div>
  //   )
  // }

  render(){
    return ( 
      <React.Fragment>
        { this.renderDropdown() }
        { this.state.dropdownVisible ? <Button> Create a new link</Button> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    // stateOptions
    states: {
      0: {text: 'Hover', icon: true},
      1: {text: 'Pressed', id:'2', icon: true},
      2: {text: 'Focus', id:'3', icon: true},
      3: {text: 'Double Click', id:'4'}
    }
  }
}

export default connect(mapStateToProps)(StatesHeader);
