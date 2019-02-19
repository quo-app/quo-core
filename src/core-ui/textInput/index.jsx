import React, { Component } from 'react';

import { fSafe } from 'quo-utils';

export default class TextInput extends Component{
  handleChange = event => {
    fSafe(this.props.onChange, event.target.value, this.props.title, false);
  }

  handleBlur = event => {
    fSafe(this.props.onChange, event.target.value, this.props.title, true);
  }

  keyPress = e => e.key === 'Enter' ? e.currentTarget.blur(e) : null

  render() {
    return (
      <div className={`text-input ${this.props.fullWidth ? 'full-width' : ''}`}>
        <input type={this.props.type}
                onBlur={this.handleBlur}
                defaultValue={this.props.text}
                onChange={this.handleChange}
                tabIndex='0'
                onKeyPress={this.keyPress}/>
        {this.props.noTitle ? null :   <div className='text-input-title'>{this.props.title}</div>}
      </div>
    );
  }
}
