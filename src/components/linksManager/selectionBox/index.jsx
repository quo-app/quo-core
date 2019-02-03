import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnapshotContainer from 'quo-components/snapshotContainer';
import { Card } from 'quo-ui/cards';
import Icons from 'quo-ui/icons';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

class LinkedSelectionBox extends Component {

  stages = [
    {
      text: 'Click here to select an element',
      className: 'init'
    },
    {
      text: 'Selected elements or artboards will appear here',
      className: 'selection'
    }
  ]

  state = {
    stageIndex: 0
  }

  changeStage = index => {
    if((this.state.stageIndex + 1) % 2 === 0){
      this.props.dispatch(actions.LINK_TARGET_SELECTION_DISABLE());
    }
    else {
      this.props.dispatch(actions.LINK_TARGET_SELECTION_ENABLE());
    }
    this.setState({ stageIndex: (this.state.stageIndex + 1) % 2 })
  }

  onDelete = id => {
    this.props.dispatch(actions.LINK_TARGET_REMOVE({ ...this.props.activeLink, target: id}))
  }

  renderComponents() {
    return (
      <div className='target-selections'>
        { this.props.components.map(targetComponent => {
          return <ComponentPreview component={targetComponent} editable onDelete={this.onDelete}/>
        })}
      </div>
    )
  }

  render() {
    const { text, className } = this.stages[this.state.stageIndex]
    return (
      <Card title='Linked Selection'>
      {this.props.targets.length === 0 ?
        <div className={`linked-selection-${className}`} onClick={()=> this.changeStage(1)}>
          { text }
        </div>
        : this.renderComponents()
      }
      </Card>

    )
  }
}

class PrimarySelectionBox extends Component {
  render() {
    return (
      <Card title='Primary Selection'>
        <div>
          <ComponentPreview component={this.props.component}/>
        </div>
      </Card>

    )
  }
}

class ComponentPreview extends Component {

  defaultProps = {
    editable: false,
    onDelete: () => {}
  }

  selector = state => selectors.components(state)
  propsSelector = component => component.props

  render () {
    return (
      <div className='component-container'>
        <div className='snapshot-wrapper'>
          <div className='snapshot'>
            <SnapshotContainer
              selector={this.selector}
              propsSelector={this.propsSelector}
              component={this.props.component}
              padding={
                { top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }
              }
            />
          </div>
        </div>
      <div className='component-name'>{this.props.component.title}</div>
      { this.props.editable ?
        <div
          className='delete-button'
          onClick={() => this.props.onDelete(this.props.component.id)}
        >
          <Icons.Close/>
        </div>
        : null
      }
    </div>
    )
  }
}

const mapStateToPropsPrimary = (state, props) => {
  if(!props.id) return {}
  const component = selectors.component(state, { id: props.id }).toJS();
  return { component };
}

const mapStateToPropsLinked = (state, props) => {
  if(!props.id) return {}
  const components = props.targets.map(componentID => {
    return selectors.component(state, { id: componentID }).toJS()
  })
  const activeLink = selectors.activeLink(state);
  return { components, activeLink };
}

ComponentPreview = connect()(ComponentPreview)
LinkedSelectionBox = connect(mapStateToPropsLinked)(LinkedSelectionBox)
PrimarySelectionBox = connect(mapStateToPropsPrimary)(PrimarySelectionBox)

export { PrimarySelectionBox, LinkedSelectionBox }