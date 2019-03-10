import { editorState, previewState } from './state';

export const editorReducer = editorState._createMainReducer();
export const previewReducer = previewState._createMainReducer();