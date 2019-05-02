import React, { Component } from 'react'

class TopBar extends Component {
  render () {
    return (
      <div className={`top-bar ${this.props.className ? this.props.className : ''}`}>
        { this.props.children }
      </div>
    )
  }
}

export default TopBar
