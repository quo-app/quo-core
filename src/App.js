import React from 'react';
import { Provider } from 'react-redux';
import uuid from 'uuid/v1';

import { editorStore, previewStore } from 'quo-redux';

import KeyController from 'quo-components/keyController';
import { SideBarRight, SideBarLeft } from 'quo-components/sideBar';
import TopBar from 'quo-components/topBar';
import DropzoneContainer from 'quo-components/dropzone';
import Viewer from 'quo-components/viewer';
import MessageStack from 'quo-components/messageStack';
import Preview from 'quo-components/preview';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './scss/main.scss';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={RedirectToEditor}/>
          <Route path='/editor/:editorId' component={Editor}/>
          <Route path='/preview/:previewId' component={PreviewWrapper}/>
        </Switch>
    </Router>
  );
}

const RedirectToEditor = () => {
  return (
    <Redirect to={`/editor/${uuid()}`}/>
  )
}


const Editor = () => {
  return (
    <Provider store={editorStore}>
      <main className="quo-content">
        <KeyController>
          <DropzoneContainer>
            <Viewer />
            <TopBar />
            <SideBarLeft />
            <SideBarRight />
          </DropzoneContainer>
          <MessageStack />
        </KeyController>
      </main>
    </Provider>
  );
}

const PreviewWrapper = ({ match }) => {
  return (
    <Provider store={previewStore}>
      <Preview id={match.params.previewId}/>
    </Provider>
  );
}

export default App
