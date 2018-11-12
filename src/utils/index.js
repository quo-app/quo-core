const fExists = f => typeof f === 'function';
export const fSafe = (f, ...args) =>  fExists(f) ? f(...args) : undefined;
export const bool2s = (props, prop, suffix='style')=> props[prop] ? `${prop}-${suffix}` : '';
