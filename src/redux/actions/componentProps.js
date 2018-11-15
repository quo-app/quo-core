const UPDATE_COMPONENT_PROPS = payload => ({
  type:'UPDATE_COMPONENT_PROPS',
  payload: payload,
})

const ADD_STATE_TO_COMPOSITE = (payload) => ({
  type:'ADD_STATE_TO_COMPOSITE',
  payload:payload,
})

const REMOVE_STATE_FROM_COMPOSITE = (payload) => ({
  type:'REMOVE_STATE_FROM_COMPOSITE',
  payload:payload,
})

export default {
  UPDATE_COMPONENT_PROPS,
  ADD_STATE_TO_COMPOSITE,
  REMOVE_STATE_FROM_COMPOSITE
}
