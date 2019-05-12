import React from 'react';
import uuid from 'uuid/v1';
import { Provider } from 'react-redux';

import { previewStore } from 'quo-redux';

import Editor from 'quo-pages/editor';
import Preview from 'quo-pages/preview';
import Projects from 'quo-pages/projects';
import AuthenticatedRoute from 'quo-components/authenticatedRoute';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './scss/main.scss';
import { projectsStore } from './redux';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={RedirectToEditor}/>
          <Route path='/preview/:previewId' component={PreviewWrapper}/>
          <Route exact path='/editor' component={RedirectToEditor}/>
          <AuthenticatedRoute path='/editor/:editorId' component={Editor}/>
          <AuthenticatedRoute exact path='/projects' component={ProjectsWrapper}/>
        </Switch>
    </Router>
  );
}

const RedirectToEditor = () => {
  return (
    <Redirect to={`/editor/${uuid()}`}/>
  )
}

const PreviewWrapper = ({ match }) => {
  return (
    <Provider store={previewStore()}>
      <Preview id={match.params.previewId}/>
    </Provider>
  );
}

const ProjectsWrapper = () => (
  <Provider store={projectsStore()}>
    <Projects/>
  </Provider>
)

export default App
