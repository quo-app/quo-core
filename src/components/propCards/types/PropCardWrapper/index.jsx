import React, { Component} from 'react';
//this needs a instantiated react component rather than an icon function
import Checkbox from 'quo-ui/checkbox';

class PropCardWrapper extends Component {
  constructor (props) {
    super(props);
    this.state = {
      enabled:true
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onCheckChange = value => {
    this.setState({ enabled: value });
  }

  render () {
    let isHalf = this.props.half ? 'half-width' : ''
    let isDisabled = this.state.enabled ? '' : 'disabled-card'
    let id = this.props.title.toLowerCase().split(' ').join('-');
    return(
      <div className={`prop-card ${isHalf} ${isDisabled}`} id={`card-${id}`}>
        <div className='prop-card-header'>
          {this.props.title}
          <Checkbox
            defaultSelected={true}
            onChange={this.onCheckChange}
          />
        </div>
        <div className='prop-card-body'>{this.props.children}</div>
      </div>
    )
  }
}

export default PropCardWrapper
