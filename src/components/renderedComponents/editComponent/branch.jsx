import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import selectors from 'quo-redux/selectors';

import { translatePropData } from 'quo-parser/propTranslator';
import { AbstractComponent } from 'quo-parser/abstract';
// import { StateGraph, StateNode } from 'quo-parser/ComponentState';

import { DragInterface, DoubleClickInterface, SelectionInterface } from './features';


import ComponentRender from '../coreComponent';

import componentWrapper from '../componentWrapper';

const makeBranch = (WrappedComponent, options) => {
  return class extends React.PureComponent {

    constructor(props){
      super(props);

      // this.staticProps = this.createStaticProps();

      // Distribute feature across interfaces for
      this.dragManager = new DragInterface(this);
      this.doubleClickManager = new DoubleClickInterface(this);
      this.selectionManager = new SelectionInterface(this);
    }

    createStaticProps = () => {
      const componentClass = this.props.component.get('type');
      const className = `edit-component ${componentClass}-component`;

      return {
        className,
        id: `component-${this.props.component.get('id')}`,
        'data-id': this.props.component.get('id'),
      }

    }

    createDynamicProps = () => {
      return {
        style: this.getStyleProps()
      }
    }

    componentWillReceiveProps(nextProps){
      if(!this.props.isParent && !nextProps.selectables.includes(this.props.id)){
        this.selectionManager.makeChildrenUnselectable();
      }
    }

    getStyleProps = () => {
      if(this.props.isParent) return { ...this.props.props }
      return translatePropData('abstract', 'css', _.pick(this.props.props, ['width','height','x','y']));
    }

    clickHandler = e => {

      // only left mouse click
      if(e.button !== 0) return;
      if(!this.props.selectables.includes(this.props.component.get('id'))) return

      // Start Drag
      this.dragManager.startDrag(e);

      // Double Click Handler
      // this handler calls the
      // onMouseDown and onDoubleClickMouseDown
      // if they exist
      this.doubleClickManager.handle(e);
    }

    onDrag = () => {
      document.removeEventListener('mouseup', this.onDoubleClickMouseUp);
      // reset the unpack that happened in doubleClickMouseDown event here
      this.selectionManager.makeChildrenUnselectable();
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
      const staticProps = this.createStaticProps()
      const dynamicProps = this.createDynamicProps()
      return(
        <div {...dynamicProps} {...staticProps} onMouseDownCapture={ !this.props.isParent ? this.clickHandler : () => {}}>
          <WrappedComponent {...this.props} wrapper={BranchComponent} type={'edit'}/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {

    if(!ownProps.selector || !ownProps.propsSelector ) return {}

    let component

    if(ownProps.isParent){
      component = ownProps.component
    }

    else {
      component = ownProps.selector(state, ownProps.id)
    }

    let props = ownProps.propsSelector(component)

    return {
      component: component,
      props: props,
      selectables: selectors.selectables(state),
    }

  }

const BranchComponent = connect(mapStateToProps)(componentWrapper(makeBranch(ComponentRender)))

export default BranchComponent