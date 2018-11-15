import React from 'react';
import { Provider } from 'react-redux';

import store from 'quo-redux';

// import KeyController from 'quo-components/keyController';
import { SideBarRight, SideBarLeft } from 'quo-components/sideBar';
import TopBar from 'quo-components/topBar';
import DropzoneContainer from 'quo-components/dropzone';
import Viewer from 'quo-components/viewer';
import MessageStack from 'quo-components/messageStack';

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
