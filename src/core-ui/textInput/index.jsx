import React, { Component } from 'react';

import { fSafe } from 'quo-utils';

export default class TextInput extends Component {

  input = React.createRef();

  state = {
    editing: false
  }

  // handleChange = event => {
  //   fSafe(this.props.onChange, event.target.value, this.props.title, false);
  // }

  handleClick = () => {
    this.setState({ editing: true}, () => {
      this.input.current.focus()
    })
  }

  handleBlur = event => {
    this.setState({ editing: false})
    fSafe(this.props.onChange, event.target.value, this.props.title, true);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const stateChanged = this.state.editing !== nextState.editing
    const valueUpdate = this.props.text !== nextProps.text
    return stateChanged || valueUpdate
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.text !== nextProps.text ) {
      this.setState({ editing: false });
    }
  }

  keyPress = e => e.key === 'Enter' ? e.currentTarget.blur(e) : null

  showDisplay () {
    return (
      <div className='input-display' onClick={this.handleClick}>{this.props.text}</div>
    )
  }

  showInput () {
    return (
      <input
      type={this.props.type}
      onBlur={this.handleBlur}
      ref={this.input}
      defaultValue={this.props.text}
      // onChange={this.handleChange}
      onKeyPress={this.keyPress}
      />
    )
  }

  render() {
    return (
      <div className={`text-input ${this.props.fullWidth ? 'full-width' : ''}`}>
        { this.state.editing ? this.showInput() : this.showDisplay() }
        {this.props.noTitle ? null :   <div className='text-input-title'>{this.props.title}</div>}
      </div>
    );
  }
}
