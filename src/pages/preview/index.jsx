import React, { Component } from 'react';
import { previews } from 'quo-db';
import { Provider } from 'react-redux';
import { PreviewRenderer } from './previewRenderer';
import { previewStore } from 'quo-redux/preview';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    const previewId = this.props.match.params.previewId;
    this.store = previewStore();
    previews.getLivePreview(previewId, ({ data }) => this.setState({ data: JSON.parse(data) }));
  }

  state = {
    data: null
  }

  render() {
    return (
      <Provider store={this.store}>
        <div class='preview-container'>
          {
            this.state.data ?
              <PreviewRenderer data={this.state.data}/>
              :
              'Loading..'
          }
        </div>
      </Provider>
    );
  }
}
