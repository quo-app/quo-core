import React from 'react';
import { Provider } from 'react-redux';

import { editorStore, previewStore } from 'quo-redux';

import KeyController from 'quo-components/keyController';
import { SideBarRight, SideBarLeft } from 'quo-components/sideBar';
import TopBar from 'quo-components/topBar';
import DropzoneContainer from 'quo-components/dropzone';
import Viewer from 'quo-components/viewer';
import MessageStack from 'quo-components/messageStack';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './scss/main.scss';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Editor}/>
          <Route path='/preview/:previewId' component={Preview}/>
        </Switch>
    </Router>
  );
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

const Preview = ({ match }) => {
  return (
    <Provider store={previewStore}>
      <div>
       { match.params.previewId }
      </div>
    </Provider>
  );
}

export default App
