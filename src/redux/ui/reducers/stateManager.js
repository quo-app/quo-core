export const updateStateManager = (stateManager, action) => {
  return { ...stateManager, ...action.payload }
}
