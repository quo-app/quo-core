import React from 'react';
import { Provider } from 'react-redux';

import store from 'quo-redux';

import KeyController from 'quo-components/keyController';
import { SideBarRight, SideBarLeft } from 'quo-components/sideBar';
import TopBar from 'quo-components/topBar';
import DropzoneContainer from 'quo-components/dropzone';
import Viewer from 'quo-components/viewer';
import MessageStack from 'quo-components/messageStack';

import selectors from 'quo-redux/selectors'

import './scss/main.scss';

function App() {
  return (
    <Provider store={store}>
      <main className="quo-content">
         <KeyController>
        </KeyController>
        {/*
        <DropzoneContainer>
          <Viewer />
          <TopBar />
          <SideBarLeft />
          <SideBarRight />
        </DropzoneContainer>
        <MessageStack /> */}
      </main>
    </Provider>
  );
}

export default App
