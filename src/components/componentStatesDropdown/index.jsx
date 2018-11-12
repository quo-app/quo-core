import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import { VerticalListCard } from 'ui-components/cards';

import Icons from 'ui-components/icons';


class ComponentStatesDropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropdown:true,
      selected:{},
      values:[
        {text: 'Hover', id:'1', icon: true},
        {text: 'Pressed', id:'2', icon: true},
        {text: 'Focus', id:'3', icon: true},
        {text: 'Double Click', id:'4'}]
    }
  }

  onOptionClick(option){
    this.setState({dropdown:false,selected:option});
    const { dispatch } = this.props;
    dispatch(actions.STATE_MANAGER_UPDATE({
      current:option.text,
    }))
  }

  onBackIconClick(){
    this.setState({dropdown:true,selected:{}});
    const { dispatch } = this.props;
    dispatch(actions.STATE_MANAGER_UPDATE({
      current:'',
    }))
  }

  renderDropdown(){
    return (
      <VerticalListCard
        title='States'
        optionIcon={ <Icons.Check/> }
        optionIconOrientation='left'
        values={this.state.values}
        onOptionClick={this.onOptionClick.bind(this)}
      />
    )
  }
  renderSelectedView(){
    return (
      <div className='selected-state-wrapper'>
        <div className='back-icon' onClick={this.onBackIconClick.bind(this)}> <Icons.Back/> </div>
        <div className='state-text'> { this.state.selected.text }</div>
      </div>

    )
  }
  render(){
    return ( this.state.dropdown ? this.renderDropdown() : this.renderSelectedView() )
  }
}

const mapStateToProps = (state) => {
  return {
    // stateOptions
    stateOptions: [
      {text:'state1',selected:false},
      {text:'state2',selected:false},
      {text:'state3',selected:false},
      {text:'state4',selected:false}
    ]
  }
}


export default connect(mapStateToProps)(ComponentStatesDropdown);
