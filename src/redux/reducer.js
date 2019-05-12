import { editorState, previewState, projectsState } from './state';

export const editorReducer = editorState._createMainReducer();
export const previewReducer = previewState._createMainReducer();
export const projectsReducer = projectsState._createMainReducer();