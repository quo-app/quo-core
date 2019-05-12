
import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash'

import { translatePropData } from 'quo-parser/propTranslator';

import ComponentRender from '../coreComponent';

import componentWrapper from '../componentWrapper';

const makeSnapshotComponent = (WrappedComponent, options) => {
  return class extends React.PureComponent {
    createWrapperProps = () => {
      let className = 'snapshot-component'
      className += ` ${this.props.type}-component`
      const id = `snapshot-${this.props.id}`
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
      return translatePropData('abstract', 'css', pick(this.props.props, picks));
    }

    render = () => {
      const wrapperProps = this.createWrapperProps();
      return(
        <div {...wrapperProps}>
          <WrappedComponent {...this.props} wrapper={SnapshotComponent} renderType='snapshot'/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  if(!ownProps.selector || !ownProps.propsSelector ) return {}

  let component;

  if(ownProps.isParent) {
    component = ownProps.component || ownProps.selector(state, ownProps.id) || ownProps.selector(state).get(ownProps.id).toJS()
  }

  if (!component) {
    component = ownProps.selector(state, ownProps.id) || ownProps.selector(state).get(ownProps.id).toJS()
  }

  console.log(component);

  return {
    id: component.id,
    type: component.type,
    children: component.children,
    props: component.props,
   }
}

const SnapshotComponent = connect(mapStateToProps)(componentWrapper(makeSnapshotComponent(ComponentRender)));

export default SnapshotComponent