import React from 'react';

// Style Card is DEPRECATED
// Remove at some point.
import { connect } from 'react-redux';

import Icons from 'ui-components/icons';

class StyleCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
      enabled:true
    }
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onCheckChange(e,checked){
    this.setState({enabled:checked});
  }

  render(){
    let isHalf = this.props.half ? 'half-width' : ''
    let isDisabled = this.state.enabled ? '' : 'disabled-style'
    let id = this.props.title.toLowerCase().split(' ').join('-');
    return(
      <div className={`style-card ${isHalf} ${isDisabled}`} id={`card-${id}`}>
        <div className='style-card-header'>
          {this.state.title}
          {/* <Checkbox
            checked={this.state.enabled}
            value={this.props.title}
            onChange={this.onCheckChange}
            /> */}
        </div>
        <div className='style-card-body'>{this.props.children}</div>
      </div>
    )
  }
}

export { StyleCard }
