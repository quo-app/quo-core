import React, { Component } from 'react';
import {connect} from 'react-redux';
// import keydown from 'react-keydown';
import uuid from 'uuid/v1'

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

let uuid1 = uuid()

class KeyController extends Component {
  state = {
    keyDown:false
  }

  componentDidMount(){
    this.props.dispatch(actions.COMPONENTS_ADD({id: uuid1, title: 'deniz'}))
    this.props.dispatch(actions.COMPONENT_STATES_ADD({id: uuid1, stateID: uuid1, title: 'asdasdasd', class:'shape', props:{
      x: 20,
      y: 20
    }}))
    this.props.dispatch(actions.COMPONENT_STATES_ADD({id: uuid1, stateID: uuid1+'s', title: 'asdasdasd', class:'shape', props:{
      x: 20,
      y: 20
    }}))
    // this.props.dispatch(actions.COMPONENT_STATE_TITLE_UPDATE({id: uuid1, stateID: uuid1, title: 'state2'}))
    this.props.dispatch(actions.COMPONENT_STATE_PROPS_ADD({id: uuid1, stateID: uuid1, prop: {
      key: 'x',
      value: 10
    }}))
    // this.props.dispatch(actions.TABS_ADD({id: uuid1, rootComponent: uuid1}));
    // this.props.dispatch(actions.TABS_REMOVE({id: uuid1}));
    // this.props.dispatch(actions.MESSAGES_ADD({
    //   type:'status',
    //   text:'this is a test message',
    //   duration: 5000
    // }))
  }

  keyUp = (e) => this.props.dispatch(actions.KEYS_UP(e.keyCode));

  keyDown = (e) => {
    if(this.props.keys.has(e.keyCode)) return;
    this.props.dispatch(actions.KEYS_DOWN(e.keyCode))
  }

  // @keydown('cmd+shift+z')
  // dispatchRedo(e){
  //   const { dispatch } = this.props
  //   dispatch(ActionCreators.redo());
  //   e.preventDefault();
  // }
  //
  // @keydown('cmd+z')
  // dispatchUndo(e){
  //   e.preventDefault();
  //   if(!this.state.keyDown){
  //     const { dispatch } = this.props
  //     dispatch(ActionCreators.undo());
  //     this.setState({keyDown:true})
  //   }
  // }

  // @keydown('cmd+s')
  // dispatchSave(e){
  //   e.preventDefault();
  // }

  render() {
    return (
      <div className='main-container' tabIndex='0' onKeyUp={this.keyUp} onKeyDown={this.keyDown} style={{width: '100%',
        height: '100%'}}>
        {this.props.children}
      </div>
    )
  }

  // @keydown('space')
  // dragEnable(e){
  //   if(!this.state.keyDown){
  //     const { dispatch } = this.props
  //     this.setState({keyDown:true},()=>{
  //       dispatch(actions.KEY_DOWN(e));
  //     })
  //   }
  // }

  // @keydown('esc')
  // dispatchDeselectComponent(e){
  //   e.preventDefault();
  //   if(!this.state.keyDown){
  //     const { dispatch } = this.props
  //     this.setState({keyDown:true},()=>{
  //       dispatch(actions.KEY_DOWN(e));
  //       dispatch(actions.COMPONENT_SELECT(''));
  //     })
  //   }
  // }
}

const mapStateToProps = state => {
  return {
    tabs: selectors.tabs(state),
    keys: selectors.keys(state)
  }
}

export default connect(mapStateToProps)(KeyController);
