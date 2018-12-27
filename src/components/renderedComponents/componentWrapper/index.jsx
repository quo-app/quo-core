import React from 'react';
import { connect } from 'react-redux';

import selectors from 'quo-redux/selectors';

const WrapperComponent = (WrappedComponent, options) => {
  return class extends React.Component {
    render = () => {
      return(
        <WrappedComponent data={'data here'} {...this.props}/>
      )
    }
  }
}

// const mapStateToProps = (state, ownProps) => {

//   if(!ownProps.selector || !ownProps.propsSelector ) return {}

//   let component

//   if(ownProps.isParent){
//     component = ownProps.component
//   }

//   else {
//     component = ownProps.selector(state, ownProps.id)
//   }

//   let props = ownProps.propsSelector(component)

//   return {
//     component: component,
//     props: props,
//     selectables: selectors.selectables(state),
//     data: {}
//   }

// }

// const componentWrapper = component => connect(mapStateToProps)(WrapperComponent(component));

const componentWrapper = component => WrapperComponent(component);

export default componentWrapper