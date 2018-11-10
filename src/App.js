import React from 'react';
// import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import { browserHistory } from 'react-router';

// import { syncHistoryWithStore, routerReducer, ConnectedRouter } from 'react-router-redux';

import store from 'quo-redux';

// import KeyController from 'ui-components/keyController/keyController';

import { SideBarRight, SideBarLeft } from 'ui-components/sideBar/sideBar';

import TopBar from './components/topBar/topBar';
import DropzoneContainer from './components/dropzone/dropzoneContainer';
import Viewer from './components/viewer/viewer';

import Icons from 'ui-components/icons';



// import PreviewLink from './components/previewLink';
import MessageStack from './components/messageStack';

import './scss/main.scss';

console.log(Icons.Close);

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


    //   <Router forceRefresh>
    //     <main className="quo-content">
    //       <Switch>
    //         <Route
    //           exact
    //           path="/"
    //           render={() => (

    //           )}
    //         />
    //         <Route
    //           path="/p/:pageId/:componentId"
    //           render={({ match }) => (
    //             <PreviewLink
    //               pageId={match.params.pageId}
    //               id={match.params.componentId}
    //             />
    //           )}
    //         />
    //       </Switch>
    //     </main>
    //   </Router>

  );
}

export default App
