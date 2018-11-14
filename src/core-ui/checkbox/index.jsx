import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fSafe } from 'quo-utils';

import Icons from 'quo-ui/icons';

export default class Checkbox extends Component {
  static propTypes = {
    defaultSelected: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    defaultSelected: false,
    disabled: false,
  }

  constructor(props){
    super(props);
    this.state = {
      selected: this.props.defaultSelected,
    }
  }
  
  onClick = () => {
    if(this.props.disabled) return;

    this.setState({selected: !this.state.selected}, () => {
      fSafe(this.props.onChange, this.state.selected);
    });
  }

  render () {
    let selectedClass = this.props.selected ? 'selected' : '';
    let disabledClass = this.props.disabled ? 'disabled' : '';
    return (
      <div 
        class={`checkbox-wrapper ${selectedClass} ${disabledClass}`}
        onClick={this.onClick}
      >
        {
          this.state.selected ?  <Icons.Checkbox/> : <Icons.CheckboxOutline/>
        }
      </div>
    )
  }
}
