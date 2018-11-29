import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getState } from 'quo-redux/state';
import actions from 'quo-redux/actions';

import { Button } from 'quo-ui/buttons';

class TopBar extends Component {
  setAppMode = (mode) => {
    const { dispatch } = this.props;
    if(this.props.appMode === mode) return;
    dispatch(actions.SET_APP_MODE(mode));
  }

  render(){
    let editSelected = this.props.appMode === 'EDIT'
    let previewSelected = this.props.appMode === 'PREVIEW'
    return (
      <div className='top-bar'>
        <Button onClick={()=> {this.props.dispatch(actions.CREATE_PREVIEW_INSTANCE({selectedComponents:[], previewId:'asdasd'}))}}>preview instance</Button>
        <Button selected={editSelected} onClick={() => this.setAppMode('EDIT')}>App Mode: EDIT</Button>
        <Button selected={previewSelected} onClick={() => this.setAppMode('PREVIEW')}>App Mode: PREVIEW</Button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  let { appMode } = getState(state, 'app');
  return { appMode };
}
export default connect(mapStateToProps)(TopBar);
