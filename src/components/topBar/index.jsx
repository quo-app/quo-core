import React, { Component } from 'react'
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import { Button } from 'quo-ui/buttons';

import uuid from 'uuid/v1'

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
        <Button onClick={()=> {this.props.dispatch(actions.PREVIEWINSTANCES_ADD({selectedComponents:[], previewID: uuid()}))}}>preview instance</Button>
        <Button selected={editSelected} onClick={() => this.props.dispatch(actions.APPMODE_SET_EDIT())}>App Mode: EDIT</Button>
        <Button selected={previewSelected} onClick={() => this.props.dispatch(actions.APPMODE_SET_PREVIEW())}>App Mode: PREVIEW</Button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { appMode: selectors.appMode(state) };
}
export default connect(mapStateToProps)(TopBar);
