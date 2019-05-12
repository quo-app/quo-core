import React, { Component } from 'react';
import { provider, auth } from 'quo-db';
import { Route } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  return class extends Component {
    constructor (props) {
      super(props);
      this.state = {
          initialAuthChange: false,
          authenticated : !!auth().currentUser,
      }
    }

    componentDidMount () {
      auth().onAuthStateChanged(this.handleAuthStateChange.bind(this));
    }

    handleAuthStateChange (user) {
      if(!this.state.initialAuthChange) {
        this.setState({ initialAuthChange: true, authenticated: !!user })
        return;
      }
      else {
        this.setState({ authenticated: !!user });
      }
    }

    signInWithPopup () {
      this.setState({ authOpen: true });
      auth().signInWithPopup(provider())
    }

    render () {
      if(this.state.authenticated) {
        return (<WrappedComponent {...this.props}/>)
      } else {
        if (!this.state.authOpen && this.state.initialAuthChange) this.signInWithPopup();
        return null;
      }
    }
  }
}

// const AuthenticatedRoute = ({ component: Component, ...rest }) => (

//   <Route {...rest} render={(props) => {
//     auth().onAuthStateChanged(user => {
//       if (user) {
//         console.log(user);
//         // User is signed in.
//       } else {
//         // User is signed out.
//       }
//     });
//     auth().signInWithPopup(provider()).then(result => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       // ...
//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
//     return (
//       <Component {...props} />
//     )
//   }} />
// )

export default withAuthentication

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
