import React, { Component } from 'react';

import { connect } from 'react-redux';

import selectors from 'quo-redux/selectors';

import Header from './header';
import Properties from './properties';

import HorizontalOptionGroup from 'quo-ui/horizontalOptionGroup'

class StateManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: '0',
      options: {
        0: { text: 'Properties', obj: <Properties/>},
        1: { text: 'Interactions', obj: null}
      }
    }
  }
  render = () => {
    if(!this.props.selectionExists) return null
    return (
      <React.Fragment>
        <div className='state-manager-wrapper'>
          <Header/>
        </div>
        <div className='content-wrapper'>
          <HorizontalOptionGroup
            selected={ this.state.selected }
            options={ this.state.options }
            onChange={ id => this.setState({selected: id})}
          />
          {
            this.state.options[this.state.selected].obj
          }
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  let selections = selectors.selectedComponents(state)
  return { selectionExists: selections.length === 1}
}

export default connect(mapStateToProps)(StateManager);
