import React, { Component } from 'react';

import { Card } from 'quo-ui/cards';

class LinkedSelectionBox extends Component {

  stages = [
    {
      text: 'Click here to select an element or artboard',
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

  changeStage = index => this.setState({ stageIndex: index })

  render() {
    const { text, className } = this.stages[this.state.stageIndex]
    return (
      <Card title='Linked Selection'>
        <div className={className} onClick={()=> this.changeStage(1)}>
          { text }
        </div>
      </Card>

    )
  }
}

class PrimarySelectionBox extends Component {

  render() {
    return (
      <Card title='Primary Selection'>
        <div>
          {this.props.link.title}
        </div>
      </Card>

    )
  }
}

export { PrimarySelectionBox, LinkedSelectionBox }