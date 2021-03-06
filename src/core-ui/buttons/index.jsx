import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Button extends Component {

  static propTypes = {
    onClick:PropTypes.func,
    selected:PropTypes.bool,
  }

  static defaultProps = {
    selected: false
  }

  render() {
    let selected = this.props.selected ? 'selected' : ''
    return (
      <div className={this.props.className}>
        <button
          className={`button-inner ${selected}`} onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export { Button }
