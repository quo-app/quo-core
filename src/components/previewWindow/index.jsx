import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class PreviewWindow extends Component {
  render() {
    return (
      <div className='preview-window-container'>
        <div className='preview-wrapper'>
          this will be the preview
        </div>
      </div>
    );
  }
}
