import React, { Component } from 'react'
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import { Button } from 'quo-ui/buttons';

import TopBar from '../topBar';
import uuid from 'uuid/v1'

class EditorTopBar extends Component {
  setAppMode = (mode) => {
    const { dispatch } = this.props;
    if(this.props.appMode === mode) return;
    dispatch(actions.SET_APP_MODE(mode));
  }

  render () {
    let editSelected = this.props.appMode === 'EDIT'
    let previewSelected = this.props.appMode === 'PREVIEW'
    return (
      <TopBar>
        <Button onClick={()=> {this.props.dispatch(actions.PROJECT_PUSH_TO_CLOUD(this.props.projectId))}}>Save Project</Button>
        <Button onClick={()=> {this.props.dispatch(actions.PREVIEW_PUSH_TO_CLOUD({selectedComponents:[], previewID: uuid()}))}}>Share Preview</Button>
        <Button selected={editSelected} onClick={() => this.props.dispatch(actions.APPMODE_SET_EDIT())}>App Mode: EDIT</Button>
        <Button selected={previewSelected} onClick={() => this.props.dispatch(actions.APPMODE_SET_PREVIEW())}>App Mode: PREVIEW</Button>
      </TopBar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appMode: selectors.appMode(state),
    projectId: selectors.projectId(state)
   }
}

export default connect(mapStateToProps)(EditorTopBar);
