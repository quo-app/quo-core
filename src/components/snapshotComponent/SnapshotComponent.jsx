
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { getState } from 'quo-redux/state';

import { translatePropData } from 'quo-parser/propTranslator';
import { AbstractComponent } from 'quo-parser/abstract';

import ComponentRender from 'quo-components/viewer/ComponentRender';

const makeSnapshotComponent = (WrappedComponent, options) => {
  return class extends Component {
    createWrapperProps = () => {
      let className = 'snapshot-component'
      if(this.props.isParent) className += ' snapshot-parent'
      const id = `snapshot-${this.props.component.id}`
      const style = this.getStyleProps();
      style.position = 'absolute';
      return { 
               className,
               id, 
               style,
             }

    }

    getStyleProps = () => {
      const props = AbstractComponent.props(this.props.component);
      let picks = ['width','height','x','y'];
      if(this.props.isParent) picks = ['width','height'];
      return translatePropData('abstract', 'css', props(picks));
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

const mapStateToProps = (state,ownProps) => {
  let domain = getState(state,'domain');
  if(ownProps.source){
    let source = ownProps.source
    let components = domain[source.location][source.filetype][source.page].components
    return { component: components[ownProps.id] }
  }
  else{
    //tab root is the parent component
    let tabRoot = domain.tabs.allTabs[domain.tabs.activeTab]
    //return the tabRoot
    if(ownProps.isParent){
      return {
        component:tabRoot,
      }
    }
  
    //return the component
    else{
      let component = domain.components[ownProps.id];
      return {
        component:component,
      }
    }
  }
}

const SnapshotComponent = connect(mapStateToProps)(makeSnapshotComponent(ComponentRender));

export default SnapshotComponent 