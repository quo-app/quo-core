import _ from 'lodash'

export default class AbstractComponent {
  // given an array of properties
  // returns a function that will yield props
  static props(component){
    let props = component.state.states.composite.props
    return (filter) => {
      // not passing in a filter returns all properties
      if(!filter) filter = _.keys(props);
      return _.pick(props, filter);
    }
  }
}