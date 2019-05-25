import React, { Component } from 'react';
import { previews } from 'quo-db';
import { Provider } from 'react-redux';
import { createReduxStructure } from 'quo-redux';
import { PreviewRenderer } from './previewRenderer';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    const previewId = this.props.match.params.previewId;
    this.store = createReduxStructure({});
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
