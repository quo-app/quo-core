import { createReduxRoot } from 'redux-shrub';

import domain from './domain';
import app from './app';
import ui from './ui';

const editorState = createReduxRoot('root', { domain, app, ui })

const constants = {
  appModes: ['EDIT','PREVIEW'],
}

export { editorState, constants }
