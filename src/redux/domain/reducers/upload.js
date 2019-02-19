import { SketchParser, PrimitiveParser } from 'quo-parser';

const uploadSketch = (assets = {}, action) => {

  console.log(action.payload.data);

  let newPage = new SketchParser.AbstractPage(action.payload.data);
  let filetype = action.payload.filetype

  if(!assets[filetype]){
    assets[filetype] = {};
  }

  assets[filetype][newPage.id] = newPage;
  return { ...assets };
}

const uploadImage = (state = {}, action) => {
  let newImage = new PrimitiveParser.AbstractImage(action.payload.data);
  let filetype = action.payload.filetype;
  if (!state[filetype]) {
    return {
      ...state,
      [filetype]: {
        [newImage.id]: newImage
      }
    }
  }
  return {
    ...state,
    [filetype]: {
      ...state[filetype],
      [newImage.id]: newImage
    }
  }
}

export { uploadSketch, uploadImage };
