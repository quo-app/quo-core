import withAuthentication from "quo-components/withAuthentication";
import React from 'react';
import { Route } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const AuthenticatedComponent = withAuthentication(Component);
    return <AuthenticatedComponent {...props}/>
  }} />
)

export default AuthenticatedRoute