
import React, { Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Map } from 'immutable'

import selectors from 'quo-redux/selectors';

import { translatePropData } from 'quo-parser/propTranslator';
import { AbstractComponent } from 'quo-parser/abstract';

import ComponentRender from '../coreComponent';

const makeSnapshotComponent = (WrappedComponent, options) => {
  return class extends Component {
    createWrapperProps = () => {
      let className = 'snapshot-component'
      className += ` ${this.props.component.get('type')}-component`
      const id = `snapshot-${this.props.component.get('id')}`
      const style = this.getStyleProps();
      style.position = 'absolute';
      return {
               className,
               id,
               style,
             }
    }

    getStyleProps = () => {
      let picks = ['width','height','x','y'];
      if(this.props.isParent) picks = ['width','height']
      // ignore the positioning of the parent since it becomes the root
      return translatePropData('abstract', 'css', _.pick(this.props.props, picks));
    }

    render = () => {
      const wrapperProps = this.createWrapperProps();
      return(
        <div {...wrapperProps}>
          <WrappedComponent {...this.props} wrapper={SnapshotComponent}/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  if(!ownProps.selector || !ownProps.propsSelector ) return {}
  let component = ownProps.selector(state)[ownProps.id]
  let props = ownProps.propsSelector(component)
  component = Map(component)
  return { component, props }
}

const SnapshotComponent = connect(mapStateToProps)(makeSnapshotComponent(ComponentRender));

export default SnapshotComponent