import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getState } from 'quo-redux/state';
import actions from 'quo-redux/actions';

import { Button } from 'ui-components/buttons';

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
        <Button title='App Mode: EDIT' selected={editSelected} onClick={() => this.setAppMode('EDIT')}/>
        <Button title='App Mode: PREVIEW' selected={previewSelected} onClick={() => this.setAppMode('PREVIEW')}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  let { appMode } = getState(state, 'app');
  return { appMode };
}
export default connect(mapStateToProps)(TopBar);
