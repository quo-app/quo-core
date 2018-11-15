import _ from 'lodash'

export default class AbstractComponent {
  // returns a function that will yield props
  // given an array of properties
  static props(component){
    let props = component.state.states.composite.props
    return (filter) => {
      if(!filter) filter = _.keys(props);
      return _.pick(props, filter);
    }
  }
}