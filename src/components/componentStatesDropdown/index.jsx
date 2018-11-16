import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';

import { VerticalListCard } from 'quo-ui/cards';
import Icons from 'quo-ui/icons';

class ComponentStatesDropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownVisible: true,
      selected: null,

    }
  }

  onOptionClick = (option) => {
    this.setState({dropdownVisible: false, selected: option});
    const { dispatch } = this.props;
    dispatch(actions.STATE_MANAGER_UPDATE({
      currentState: option.text,
    }))
  }

  onBackIconClick = () => {
    this.setState({dropdownVisible: true, selected: null });
    const { dispatch } = this.props;
    dispatch(actions.STATE_MANAGER_UPDATE({
      currentState:'',
    }))
  }

  renderDropdown = () => { 
    return (
      <VerticalListCard
        title='States'
        optionIcon={ <Icons.Check/> }
        optionIconOrientation='left'
        values={ this.props.states }
        onOptionClick={ this.onOptionClick }
      />
    )
  }

  renderSelectedView = () => {
    return (
      <div className='selected-state-wrapper'>
        <div className='back-icon' onClick={ this.onBackIconClick }> 
          <Icons.Reply/> 
        </div>
        <div className='state-text'> { this.state.selected.text }</div>
      </div>
    )
  }
  render(){
    return ( this.state.dropdownVisible ? this.renderDropdown() : this.renderSelectedView() )
  }
}

const mapStateToProps = state => {
  return {
    // stateOptions
    states:[
      {text: 'Hover', id:'1', icon: true},
      {text: 'Pressed', id:'2', icon: true},
      {text: 'Focus', id:'3', icon: true},
      {text: 'Double Click', id:'4'}]
  }
}


export default connect(mapStateToProps)(ComponentStatesDropdown);
