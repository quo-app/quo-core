import React from 'react';
import uuid from 'uuid/v1';
import { Provider } from 'react-redux';

import { previewStore } from 'quo-redux';

import Editor from 'quo-components/editor';
import Preview from 'quo-components/preview';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './scss/main.scss';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={RedirectToEditor}/>
          <Route path='/editor/:editorId' component={Editor}/>
          <Route path='/preview/:previewId' component={PreviewWrapper}/>
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
