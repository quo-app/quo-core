import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { fSafe } from 'quo-utils';

import { Button } from 'quo-ui/buttons';

import Card from './Card';


export default class DropdownCard extends Component {

    static propTypes = {
      title: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      collapsed: PropTypes.bool,
      icon: PropTypes.element,
      defaultValue: PropTypes.string.isRequired,
      options: PropTypes.objectOf(PropTypes.string),
      onChange:PropTypes.func,
      // { id1: text, id2: text ...}
    }

    constructor(props){
      super(props);
      this.state = {
        selected: this.props.defaultValue,
        dropdownVisible: false,
      }
    }

    updateSelected = (id) => {
      this.setState({selected: id});
      fSafe(this.props.onChange, id);
    }

    updateDropdownVisibility = (value) => {
      if(value) this.setState({dropdownVisible:value})
      this.setState({dropdownVisible: !this.state.dropdownVisible})
    }

    renderDropdown (){
      return (
        <ul>
        { _.keys(this.props.options).map(((id)=>{
          let selected = this.state.selected === id ? 'selected' : '';
          return(
            <li className={selected} key={id} onClick={()=>{
              this.updateSelected(id)
              this.updateDropdownVisibility(false)
            }}>
              {this.props.options[id]}
            </li>
          )}))
        }
      </ul>
      )
    }

    render(){
      return (
        <React.Fragment>
        <Card { ...this.props } className='dropdown-card'>
          <div className='dropdown-selected' onClick={this.updateDropdownVisibility}>
              {this.props.options[this.state.selected]}
            </div>
        </Card>
        {
          this.state.dropdownVisible ?
          <div className='card-dropdown-options-wrapper'>
            { this.renderDropdown() }
            <Button onClick={() => {this.updateDropdownVisibility(false)}}>Cancel</Button>
          </div> : null
        }
        </React.Fragment>
      )
    }
  }