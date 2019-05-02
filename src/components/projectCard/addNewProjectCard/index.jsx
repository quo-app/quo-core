import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddNewProjectCard extends Component {
  onClick = () => {
    this.props.history.push('/editor')
  }
  render () {
    return (
      <div className='project-card new-project-card' onClick={this.onClick}>

      </div>
    )
  }
}

export default withRouter(AddNewProjectCard)