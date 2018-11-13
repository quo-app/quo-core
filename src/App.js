import React from 'react';
import { Provider } from 'react-redux';

import store from 'quo-redux';

// import KeyController from 'ui-components/keyController/keyController';

import { SideBarRight, SideBarLeft } from 'ui-components/sideBar/sideBar';

import TopBar from 'ui-components/topBar';
import DropzoneContainer from 'ui-components/dropzone';
import Viewer from 'ui-components/viewer/viewer';

import MessageStack from './components/messageStack';

import './scss/main.scss';

// import { firebase } from './firebase';

// const config = {
//   apiKey: "AIzaSyCOJCrAjbXhyjVF94rUH6GEqoxI0jEuutM",
//   authDomain: "quo-app-data.firebaseapp.com",
//   databaseURL: "https://quo-app-data.firebaseio.com",
//   storageBucket: "quo-app-data.appspot.com",
// };

function App() {
  return (
    <Provider store={store}>
      <main className="quo-content">
        {/* <KeyController>
        </KeyController> */}
        <DropzoneContainer>
          <Viewer />
          <TopBar />
          <SideBarLeft />
          <SideBarRight />
        </DropzoneContainer>
        <MessageStack />
      </main>
    </Provider>
  );
}

export default App
