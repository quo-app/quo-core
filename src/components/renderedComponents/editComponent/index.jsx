import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import { getState } from 'quo-redux/state';
import { translatePropData } from 'quo-parser/propTranslator';
import { AbstractComponent } from 'quo-parser/abstract';

import ComponentRender from '../coreComponent';

// this speed determines when to fire the click events
const doubleClickSpeed = 350;

const makeEditComponent = (WrappedComponent, options) => {
  return class extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        dragStart: {
            x:0,
            y:0
        },
        doubleClickPossible: false,
        childrenCanBeSelected: false,
      }
      this.DOMref = React.createRef();
    }

    createWrapperProps = () => {

      const componentClass = this.props.isParent ? 'parent' : this.props.component.class
      const className = `edit-component ${componentClass}-component`

      return { 
               className,
               id: `component-${this.props.component.id}`,
               style: this.getStyleProps(),
               onMouseDownCapture: !this.props.isParent ? this.clickHandler : () => {},
             }

    }

    componentWillReceiveProps(nextProps){
      if(!this.props.isParent && !nextProps.selectables.includes(this.props.component.id)){
        this.makeChildrenUnselectable();
      }
    }

    getStyleProps = () => {
      if(this.props.isParent) return { ...this.props.style }
      const props = AbstractComponent.props(this.props.component);
      return translatePropData('abstract', 'css', props(['width','height','x','y']));
    }

    saveDragStart = (x, y) => {
      this.setState({dragStart: { x, y }});
    }

    updateComponentPosition = (x, y) => {
      const { dispatch } = this.props;
      dispatch(actions.UPDATE_COMPONENT_PROPS({ props: {x, y}, id: this.props.component.id }));
    }

    clickHandler = e => {
      // only left mouse click
      if(e.button !== 0) return;
      if(!this.props.selectables.includes(this.props.component.id)) return;

      // enable dragging capability
      this.saveDragStart(e.pageX, e.pageY);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);

      // track timing for figuring out
      // if this is a second click(double click)
      if(!this.state.doubleClickPossible){
        this.setState({doubleClickPossible: true}, ()=>{
          setTimeout(()=>{
            this.setState({doubleClickPossible:false});
          }, doubleClickSpeed)
        });
        this.onMouseDown(e);
      }

      else if( this.state.doubleClickPossible ){
        this.onDoubleClickMouseDown(e);
      }
    }

    onMouseDown = e => {
      if(!this.state.childrenCanBeSelected){
        this.selectComponent();
        e.stopPropagation();
      }
      else if (this.state.childrenCanBeSelected){
        document.removeEventListener('mousemove', this.onMouseMove);
      }
    }

    onDoubleClickMouseDown = e => {
      this.makeChildrenSelectable();
      document.addEventListener('mouseup', this.onDoubleClickMouseUp);
      e.stopPropagation();
    }

    makeChildrenSelectable = () => {
      this.setState({ childrenCanBeSelected: true });
      const { dispatch } = this.props;
      // update selectables to be the children
      dispatch(actions.VIEWER_SELECTABLES(this.props.component.children));
    }

    makeChildrenUnselectable = () => {
      this.setState({ childrenCanBeSelected: false });
    }

    onDoubleClickMouseUp = e => {
      if(this.props.component.children.length > 0){
        // select the child component here
        this.determineWhichChildToSelect(e);
      }
      document.removeEventListener('mouseup', this.onDoubleClickMouseUp);
    }

    determineWhichChildToSelect = e => {
      let mouse = {x: e.clientX, y: e.clientY}
      this.props.component.children.some( id => {
        // this loop determines which inner child is selected.
        // the criteria is that is it the first
        // child that for which the mouse falls within its
        // boundaries
        let elem = document.getElementById(`component-${id}`);
        let pos = elem.getBoundingClientRect();

        if(this.isWithinBoundaries(pos, mouse)){
          this.selectOtherComponent(id);
          console.log(id);
          return true;
        }

        return false;
      })
    }

    isWithinBoundaries(box, pos){
      return box.left <= pos.x &&
             box.right >= pos.x &&
             box.top <= pos.y &&
             box.bottom >= pos.y
    }

    onMouseMove = e => {

      if(this.props.isParent) return;

      e.stopPropagation();

      const box = this.DOMref.current.getBoundingClientRect(); 
      const props = AbstractComponent.props(this.props.component);
      const { width, x, y } = props(['width','x','y']);
  
      //including the scale of the viewer zoom

      const scale = box.width / width;

      let deltaX = (e.pageX - this.state.dragStart.x) * 1 / scale;
      let deltaY = (e.pageY - this.state.dragStart.y) * 1 / scale;

      if(deltaX !== 0 || deltaY !== 0){
        // case where the component moved and unpacking does not occur
        // therefore the second mouse up event is not fired
        document.removeEventListener('mouseup', this.onDoubleClickMouseUp);
        // reset the unpack that happened in doubleClickMouseDown event here
        this.makeChildrenUnselectable();
        // update the position in the store
        this.updateComponentPosition(x + deltaX, y + deltaY)
      }
  
      this.saveDragStart(e.pageX, e.pageY);

    }

    onMouseUp = e => {

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);

      e.stopPropagation();
    }

    selectComponent = () => {
      const { dispatch } = this.props;
      dispatch(actions.COMPONENT_SELECT(this.props.component.id));
    }

    selectOtherComponent = (id) => {
      const { dispatch } = this.props;
      dispatch(actions.COMPONENT_SELECT(id));
    }
    
    render = () => {
      const wrapperProps = this.createWrapperProps();
      return(
        <div {...wrapperProps} tabIndex='0' ref={this.DOMref}>
          <WrappedComponent {...this.props} wrapper={EditComponent}/>
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

const EditComponent = connect(mapStateToProps)(makeEditComponent(ComponentRender))

export default EditComponent