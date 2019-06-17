import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SnapshotContainer from 'quo-components/snapshotContainer'

class ExistingProjectCard extends Component {
  onClick = () => {
    this.props.history.push(`/editor/${this.props.projectId}`)
  }

  render () {

    const data = JSON.parse(this.props.data);
    const { components } = data;
    const rootComponent = data.tabs.tabs[data.tabs.currentTab].rootComponent;

    console.log(components);

    const calcWidth = artboards => {
      const leftMost = Math.min(...artboards.map(c => components[c].props.x))
      const rightMost = Math.max(...artboards.map(c => components[c].props.x + components[c].props.width))
      return Math.abs(leftMost + rightMost)
    }

    const calcHeight = artboards => {
      const topMost = Math.min(...artboards.map(c => components[c].props.y))
      const bottomMost = Math.max(...artboards.map(c => components[c].props.y + components[c].props.height))
      return Math.abs(topMost + bottomMost)
    }

    const parentComponent = {
      id: 'root',
      type: 'parent',
      children: rootComponent.children,
      props: { ...rootComponent.props,
        width: calcWidth(rootComponent.children),
        height: calcHeight(rootComponent.children),
      }
    }

    const selector = (state, id) => components[id]
    const propsSelector = component => component.props

    return (
      <div className='project-card existing-project-card' onClick={this.onClick}>
        <SnapshotContainer
          selector={selector}
          propsSelector={propsSelector}
          component={parentComponent}
          padding={
            { top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }
          }
        />
      </div>
    )
  }
}

export default withRouter(ExistingProjectCard)
