// import * as firebase from 'firebase/app';
// import { auth } from 'quo-db';

// firebase.auth().signInWithPopup(auth()).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   console.log(user);
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { provider } from 'quo-db';

class Login extends Component {

  handleSignInButton = () => {
    console.log('yo');
    firebase.auth().signInWithRedirect(provider());
  }

  render () {
    return (
      <main className="quo-content projects">
        <div className='projects-main'>
          <button onClick={this.handleSignInButton}>Sign in</button>
        </div>
      </main>
    )
  }
}

export default Login

// firebase.auth().signInWithPopup(auth()).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   console.log(user);
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
