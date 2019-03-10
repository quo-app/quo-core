import { editorState } from './state';

const selectors = editorState._composeSelectors();

console.log(selectors);

export default selectors