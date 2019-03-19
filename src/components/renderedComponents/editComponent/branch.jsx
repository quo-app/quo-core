import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import selectors from 'quo-redux/selectors';
import { translatePropData } from 'quo-parser/propTranslator';

import { DragInterface, DoubleClickInterface, SelectionInterface } from './features';
import ComponentRender from '../coreComponent';
import componentWrapper from '../componentWrapper';
import { previewReducer } from '../../../redux/reducer';

const makeBranch = (WrappedComponent, options) => {
  return class extends React.Component {

    constructor(props){
      super(props);
      // Distribute feature across interfaces for
      this.dragManager = new DragInterface(this);
      this.doubleClickManager = new DoubleClickInterface(this);
      this.selectionManager = new SelectionInterface(this);
    }

    createStaticProps = () => {
      const className = `edit-component ${this.props.type}-component`
      return {
        className,
        id: `component-${this.props.id}`
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
      return translatePropData('abstract', 'css', pick(this.props.props, ['width','height','x','y']));
    }

    clickHandler = e => {

      // only left mouse click
      if(e.button !== 0) return true;
      if(!this.props.selectables.includes(this.props.id)) return

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
          <WrappedComponent {...this.props} wrapper={BranchComponent} renderType='edit'/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {

    if(!ownProps.selector) return {}

    const component = ownProps.isParent ? ownProps.component : ownProps.selector(state, ownProps.id)

    const currentState = selectors.currentState(state);

    let props;

    if (ownProps.isParent) {
      props = component.get('props')
    }

    else {
      const states = component.get('states')
      const defaultStateProps = states.getIn(['default', 'props'])
      const currentStateProps = states.getIn([currentState, 'props'])

      props = defaultStateProps.merge(currentStateProps)
    }


    return {
      id: component.get('id'),
      props: props.toJS(),
      type: component.get('type'),
      children: component.get('children'),
      selectables: selectors.selectables(state),
      currentState,
    }
  }

const BranchComponent = connect(mapStateToProps)(componentWrapper(makeBranch(ComponentRender)))

export default BranchComponent