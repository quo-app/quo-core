import { getState } from 'quo-redux/state';

// These are the selectors for components.

export const getDomain = (state) => getState(state,'domain')

export const getComponents = (state) => getDomain(state).components

export const getComponent = (state,id) => getComponents(state)[id]

export const getComponentStates = (id) => getComponent(state,id).state.states

export const getComponentProps = (state,id) => getComponentStates(state,id).composite.props
