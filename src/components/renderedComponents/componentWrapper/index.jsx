import React from 'react';
import { connect } from 'react-redux';

import selectors from 'quo-redux/selectors';

const WrapperComponent = (WrappedComponent, options) => {
  return class extends React.Component {
    render = () => {
      return(
        <WrappedComponent {...this.props}/>
      )
    }
  }
}

const componentWrapper = component => WrapperComponent(component);

export default componentWrapper
