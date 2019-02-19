import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fSafe } from 'quo-utils';

export default class HorizontalOptionGroup extends Component {

  static propTypes = {
    options: PropTypes.object,
    selected: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    options: {}
  }

  render(){
    return (
      Object.keys(this.props.options).length > 0 ? <div className='horizontal-option-group-wrapper'>
        {
          Object.keys(this.props.options).map( id => {
            let option = this.props.options[id];
            return (
              <div
                className={`horizontal-option ${ this.props.selected === id ? 'selected' : ''}`}
                onClick={() => {fSafe(this.props.onChange, id)}}
                key={id}>
                {option.text}
              </div>
            )
          })
        }
      </div> : null
    )
  }
}