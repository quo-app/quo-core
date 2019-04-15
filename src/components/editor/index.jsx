import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

import { editorStore } from 'quo-redux';
import { getProject } from 'quo-db/projects';
import actions from 'quo-redux/actions';
import KeyController from 'quo-components/keyController';
import { SideBarRight, SideBarLeft } from 'quo-components/sideBar';
import TopBar from 'quo-components/topBar';
import DropzoneContainer from 'quo-components/dropzone';
import Viewer from 'quo-components/viewer';
import MessageStack from 'quo-components/messageStack';

class Editor extends Component {
  state = {
    initialMountFired: false
  }

  componentDidMount () {
    if (!this.state.initialMountFired) {
      this.retrieveOrLoadNewProject();
      this.setState({ initialMountFired: true });
    }
  }

  retrieveOrLoadNewProject () {
    const id = this.props.match.params.editorId;
    const { dispatch } = this.props;
    getProject(id).then(project => {
      if(project) {
        // project exists
        this.hydrateDomain(JSON.parse(project[id].data));
      } else {
        dispatch(actions.PROJECT_PUSH_TO_CLOUD(id));
      }
    })
  }

  hydrateDomain (projectData) {
    const { dispatch } = this.props;
    dispatch(actions.HYDRATE_DOMAIN(projectData));
  }

  render () {
    return (
      <main className="quo-content">
        <KeyController>
          <DropzoneContainer>
            <Viewer/>
            <TopBar/>
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