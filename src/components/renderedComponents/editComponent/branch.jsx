import React from 'react';
import { connect } from 'react-redux';

import { getState } from 'quo-redux/state';
import { translatePropData } from 'quo-parser/propTranslator';
import { AbstractComponent } from 'quo-parser/abstract';

import { DragInterface, DoubleClickInterface, SelectionInterface } from './features';

import ComponentRender from '../coreComponent';

const makeBranch = (WrappedComponent, options) => {
  return class extends React.Component {

    constructor(props){
      super(props);

      this.staticProps = this.createStaticProps();

      // Distribute feature across interfaces for 
      this.dragManager = new DragInterface(this);
      this.doubleClickManager = new DoubleClickInterface(this);
      this.selectionManager = new SelectionInterface(this);

    }

    createStaticProps = () => {
      const componentClass = this.props.isParent ? 'parent' : this.props.component.class;
      const className = `edit-component ${componentClass}-component`;

      return { 
        className,
        id: `component-${this.props.component.id}`,
        onMouseDownCapture: !this.props.isParent ? this.clickHandler : () => {},
      }

    }

    createDynamicProps = () => {
      return {
        style: this.getStyleProps()
      }
    }

    componentWillReceiveProps(nextProps){
      if(!this.props.isParent && !nextProps.selectables.includes(this.props.component.id)){
        this.selectionManager.makeChildrenUnselectable();
      }
    }

    getStyleProps = () => {
      if(this.props.isParent) return { ...this.props.style }
      const props = AbstractComponent.props(this.props.component);
      return translatePropData('abstract', 'css', props(['width','height','x','y']));
    }

    onDrag = () => {
      document.removeEventListener('mouseup', this.onDoubleClickMouseUp);
      // reset the unpack that happened in doubleClickMouseDown event here
      this.selectionManager.makeChildrenUnselectable();
    }

    clickHandler = e => {

      // only left mouse click
      if(e.button !== 0) return;
      if(!this.props.selectables.includes(this.props.component.id)) return;

      // Start Drag 
      this.dragManager.startDrag(e);

      // Double Click Handler
      // this handler calls the 
      // onMouseDown and onDoubleClickMouseDown
      // if they exist
      this.doubleClickManager.handle(e);
    }

    onMouseDown = e => {
      this.selectionManager.decideSelection(e);
    }

    onDoubleClickMouseDown = e => {
      this.selectionManager.makeChildrenSelectable();
    }

    onDoubleClickMouseUp = e => {
      this.selectionManager.selectAChild(e);
    }
    
    render = () => {
      const dynamicProps = this.createDynamicProps();
      return(
        <div {...dynamicProps} {...this.staticProps}>
          <WrappedComponent {...this.props} wrapper={BranchComponent} type={'edit'}/>
        </div>
      )
    }
  }
}
  
const mapStateToProps = (state, ownProps) => {

    let domain = getState(state, 'domain');
    let app = getState(state, 'app');

    //tab root is the parent component
    let tabRoot = domain.tabs.allTabs[domain.tabs.activeTab]
    //return the tabRoot
    if(ownProps.isParent){
      return {
        component: tabRoot,
      }
    }
  
    //return the component
    else{
      let component = domain.components[ownProps.id];
      return {
        component: component,
        selectables: app.selection.selectables,
      }
    }
  
  }

const BranchComponent = connect(mapStateToProps)(makeBranch(ComponentRender));

export default BranchComponent