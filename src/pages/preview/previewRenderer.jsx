import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PreviewComponent } from 'quo-components/renderedComponents';
import { actions, selectors } from 'quo-redux/preview';

class PreviewRenderer extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    const { components } = data;
    this.props.dispatch(actions.CREATE_STATEFUL_COMPONENTS({components: components}));
  }

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

    if (this.props.enabled) {
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
    } else {
      return null
    }


  }
}

const mapper = (state, ownProps) => {
  return {
    enabled: selectors.processing(state)
  }
}

PreviewRenderer = connect(mapper)(PreviewRenderer);
export { PreviewRenderer }
