import _ from 'lodash'
import { Map } from 'immutable'
import { traverseAndAdd, createNewIds } from 'quo-utils/component'

const assetToEditComponent = (assetComponent, allComponents) => {

  if(!assetComponent) return {}

  // give everything new ids
  let targetComponents = traverseAndAdd(assetComponent, allComponents);
  let { components, rootID } = createNewIds({ rootID: assetComponent.id, components: targetComponents })

  let rootComponent = components[rootID];

  rootComponent.props = {...rootComponent.props, x:0, y:0}

  components = _.mapValues(components, createStates)
  return { components, rootID }

  // transform the data to an appropriate from from which we can instantiate the object tree
}

const createStates = component => {
  let states = []

  const defaultStates = [
    { title: 'default', active: true, props: component.props},
    { title: 'hover', add:['onMouseEnter'], remove:['onMouseLeave'] },
    { title: 'press', add:['onMouseDown'], remove:['onMouseUp']},
    { title: 'click', add:['onFocus'], remove:['onBlur']}
  ]

  defaultStates.forEach( state => {
    let id = state.title
    let newState = createState({id, ...state, ...getMainAttributes(component)})
    states.push(newState)
  })

  component.state = states

  return component
}

const getMainAttributes = component => ({ children: component.children, parent: component.parent, type: component.type })

const createState = ({ id, title, active= false, add = [], remove = [], props = {}, children, parent, type}) => {
  return {
    stateID: id,
    title,
    type,
    props,
    active,
    children,
    parent,
    add,
    remove,
  }
}


export { assetToEditComponent }
