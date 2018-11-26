import messageActions from './messageStack';

const ADD_COMPONENT_STATE_ACTION = (payload,domain) => ({
  type:'ADD_COMPONENT_STATE',
  payload:payload
})

const ADD_COMPONENT_STATE = (payload) => (dispatch,getFullState) => {
  dispatch(ADD_COMPONENT_STATE_ACTION(payload));
}

export default {
    ADD_COMPONENT_STATE
}
