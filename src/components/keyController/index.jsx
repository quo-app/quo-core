import React, { Component } from 'react';
import {connect} from 'react-redux';
import keydown from 'react-keydown';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

console.log(actions.KEY_UP)

class KeyController extends Component {
  state = {
    keyDown:false
  }

  keyUp = (e) => this.props.dispatch(actions.KEY_UP(e.keyCode));

  keyDown = (e) => {
    if(this.props.keys.has(e.keyCode)) return;
    this.props.dispatch(actions.KEY_DOWN(e.keyCode))
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
    keys: selectors.key(state)
  }
}

export default connect(mapStateToProps)(KeyController);
