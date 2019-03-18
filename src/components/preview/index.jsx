import React, { Component } from 'react';
import { Map } from 'immutable';
import { PreviewComponent } from 'quo-components/renderedComponents';
import { previews } from 'quo-db';

export default class Preview extends Component {

  state = {
    data: null
  }

  constructor(props) {
    super(props);
    previews.getLivePreview(this.props.id, ({ data }) => this.setState({ data: JSON.parse(data) }));
  }

  renderComponents () {
    const data = this.state.data;
    const { components } = data;
    const rootComponent = data.tabs.tabs[data.tabs.currentTab].rootComponent;

    const parentComponent = {
      id: 'root',
      type: 'parent',
      children: rootComponent.children,
      props: rootComponent.props
    }


    return (
      <PreviewComponent
        style={{
            left:'750px',
            top:'525px',
        }}
        isParent
        component={parentComponent}
        selector={(state, id) => components[id]}
      />
    )
  }

  render() {
    return (
      <div>
        { this.state.data ? this.renderComponents() : 'Loading..'}
      </div>
    );
  }
}
