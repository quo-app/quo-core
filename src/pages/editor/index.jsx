import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v1';

import { editorStore } from 'quo-redux';
import { getProject } from 'quo-db/projects';
import actions from 'quo-redux/actions';
import KeyController from 'quo-components/keyController';
import { SideBarRight, SideBarLeft } from 'quo-components/sideBar';
import { EditorTopBar } from 'quo-components/topBar';
import DropzoneContainer from 'quo-components/dropzone';
import Viewer from 'quo-components/viewer';
import MessageStack from 'quo-components/messageStack';

class Editor extends Component {
  state = {
    initialMountFired: false
  }

  componentDidMount () {
    if (!this.state.initialMountFired && this.props.match.params.editorId) {
      this.retrieveOrLoadNewProject();
      this.setState({ initialMountFired: true });
    }
  }

  retrieveOrLoadNewProject () {
    const id = this.props.match.params.editorId;
    const { dispatch } = this.props;

    getProject(id).then(project => {
      // set the project id
      dispatch(actions.PROJECT_ID_UPDATE(id));

      if(project) {
        // project exists
        this.hydrateDomain(JSON.parse(project[id].data));
      } else {
          dispatch(actions.TABS_ADD({ id: uuid()}));
          dispatch(actions.PROJECT_PUSH_TO_CLOUD(id));
      }
    })
  }

  hydrateDomain (projectData) {
    const { dispatch } = this.props;
    dispatch(actions.HYDRATE_DOMAIN(projectData));
  }

  renderRedirect () {
    return (<Redirect to={`/editor/${uuid()}`}/>)
  }

  render () {
    if (!this.props.match.params.editorId) {
      return this.renderRedirect();
    }
    return (
      <main className="quo-content">
        <KeyController>
          <DropzoneContainer>
            <Viewer/>
            <EditorTopBar/>
            <SideBarLeft/>
            <SideBarRight/>
          </DropzoneContainer>
          <MessageStack/>
        </KeyController>
      </main>
    )
  }
}

const EditorWrapper = (props) => (
  <Provider store={editorStore()}>
    <Editor {...props}/>
  </Provider>
)

Editor = connect()(Editor)

export default EditorWrapper;
