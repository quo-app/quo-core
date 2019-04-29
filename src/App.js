import React from 'react';
import uuid from 'uuid/v1';
import { Provider } from 'react-redux';

import { previewStore } from 'quo-redux';

import Editor from 'quo-pages/editor';
import Preview from 'quo-pages/preview';
import Projects from 'quo-pages/projects';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './scss/main.scss';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={RedirectToEditor}/>
          <Route path='/editor/:editorId' component={Editor}/>
          <Route path='/preview/:previewId' component={PreviewWrapper}/>
          <Route path='/projects/:userId' component={Projects}/>
          {/* Handle the paths that don't have the /param */}
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

export default App
