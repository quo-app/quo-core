import React, { Component } from 'react';
import { previews } from 'quo-db';
import { PreviewRenderer } from './previewRenderer';

export default class Preview extends Component {

  state = {
    data: null
  }

  constructor(props) {
    super(props);
    previews.getLivePreview(this.props.id, ({ data }) => this.setState({ data: JSON.parse(data) }));
  }

  render() {
    return (
      <div>
        {
          this.state.data ?
            <PreviewRenderer data={this.state.data}/>
            :
            'Loading..'
        }
      </div>
    );
  }
}
