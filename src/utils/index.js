// Functions that are used in the react components usually.
const fExists = f => typeof f === 'function';
export const fSafe = (f, ...args) =>  fExists(f) ? f(...args) : undefined;
export const bool2s = (props, prop, suffix='style')=> props[prop] ? `${prop}-${suffix}` : '';

export const deepFreeze = obj => {

  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  
  for (let name of propNames) {
    let value = obj[name];

    obj[name] = value && typeof value === "object" ? 
      deepFreeze(value) : value;
  }

  return Object.freeze(obj);
}
