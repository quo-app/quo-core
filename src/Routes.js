import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AuthenticatedRoute from 'quo-components/authenticatedRoute';

import Landing from 'quo-pages/landing';
import Editor from 'quo-pages/editor';
import Preview from 'quo-pages/preview';
import Projects from 'quo-pages/projects';

import './scss/main.scss';

function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/preview/:previewId' component={Preview}/>
          <AuthenticatedRoute path='/editor/:editorId' component={Editor}/>
          <AuthenticatedRoute exact path='/projects' component={Projects}/>
        </Switch>
    </Router>
  );
}

export default Routes
