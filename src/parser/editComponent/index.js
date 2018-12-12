import uuid from 'uuid/v1'
import _ from 'lodash'

import { traverseAndAdd, createNewIds } from 'quo-utils/component'

const assetToEditComponent = (assetComponent, allComponents) => {

  // children ( artboard ids)
  // components
  // component should have
  // brand new id
  // type
  // state
  //   stateID:
  //    type
  //    props
  //    children
  //
  // props(abstract)

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
  let states = {}

  const defaultStates = [
    { title: 'default', isDefault: true, ...getMainAttributes(component)},
    { title: 'hover', add:['onMouseEnter'], remove:['onMouseLeave'], ...getMainAttributes(component) },
    { title: 'press', add:['onMouseDown'], remove:['onMouseUp'], ...getMainAttributes(component) },
    { title: 'click', add:['onFocus'], remove:['onBlur'], ...getMainAttributes(component)}
  ]

  defaultStates.forEach( state => {
    let id = uuid().toUpperCase()
    let newState = createState({...state, id})
    states[id] = newState
  })
  component.state = states

  component._coreProps = component.props

  // remove unneeded properties
  // component.type = undefined
  // component.children = undefined
  // component.parent = undefined
  component.props = undefined

  return component
}

const getMainAttributes = component => ({ children: component.children, parent: component.parent, type: component.type })

const createState = ({ id, title, add = [], remove = [], isDefault = false, props = {}, children, parent, type}) => {
  return {
    id,
    title,
    props,
    children,
    parent,
    add,
    remove,
    isDefault
  }
}


export { assetToEditComponent }
