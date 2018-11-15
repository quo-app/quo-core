import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fSafe } from 'quo-utils';

import Icons from 'quo-ui/icons';

export default class Checkbox extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    disabled: false
  }

  render () {
    let selectedClass = this.props.selected ? 'selected' : '';
    let disabledClass = this.props.disabled ? 'disabled' : '';
    return (
      <div 
        className={`checkbox-wrapper ${selectedClass} ${disabledClass}`}
        onClick={ () => fSafe(this.props.onClick, !this.props.selected)}
      >
        {
          this.props.selected ?  <Icons.Checkbox/> : <Icons.CheckboxOutline/>
        }
      </div>
    )
  }
}
