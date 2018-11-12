import { getState } from 'quo-redux/state';

// These are the selectors for components.
// Currently the specific components that get rendered are in the root of a tab,
// but they will be moved to domain.components so that a tab is just a reference of
// components :)

export const getDomain = (state) => getState(state,'domain')

export const getComponents = (state) => getDomain(state).components

export const getComponent = (state,id) => getComponents(state)[id]

export const getComponentStates = (state,id) => getComponent(state,id).state.states

export const getComponentProps = (state,id) => getComponentStates(state,id).composite.props
