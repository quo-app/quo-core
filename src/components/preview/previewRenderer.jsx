import React, { Component } from 'react';
import { PreviewComponent } from 'quo-components/renderedComponents';

export default class PreviewRenderer extends Component {
  render () {
    const data = this.props.data;
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
}