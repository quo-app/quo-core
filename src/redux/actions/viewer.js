const VIEWER_RESIZE = zoomAmount => ({
  type: 'VIEWER_RESIZE',
  payload: zoomAmount
});

const VIEWER_SELECTABLES = selectables => ({
  type: 'VIEWER_SELECTABLES',
  payload: selectables
});

export default {
  VIEWER_RESIZE,
  VIEWER_SELECTABLES
}
