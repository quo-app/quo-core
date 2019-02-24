import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SidebarModal extends Component {
  wrapper () {
    return (
        <div className={`sidebar-modal sidebar-modal-${this.location}`}>
        { this.props.children }
      </div>
    )
  }
  render () {
    return ReactDOM.createPortal(
      this.wrapper(),
      document.getElementById(`sidebar-${this.location}`)
    );
  }
}

class RightSidebarModal extends SidebarModal {
  location = 'right'
}

class LeftSidebarModal extends SidebarModal {
  location = 'left'
}

export { RightSidebarModal, LeftSidebarModal }