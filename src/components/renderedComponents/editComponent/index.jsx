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
      this.selectComponent();
      e.stopPropagation();
    }

    onDoubleClickMouseDown = e => {
      console.log('unpacking the object')
      // update possible component selections here
      document.addEventListener('mouseup', this.onDoubleClickMouseUp);
      e.stopPropagation();
    }

    onDoubleClickMouseUp = e => {
      console.log('selecting the inner component')

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
          this.selectOtherComponent(id)
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

        // update the position in the store
        this.updateComponentPosition(x + deltaX, y + deltaY)
      }
  
      this.saveDragStart(e.pageX, e.pageY);
  
      e.preventDefault();
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

// class ComponentRendererCore extends React.PureComponent {
//     constructor(props) {
//       super(props);
//       this.state = {
//         controller: props.controller,
//         clicked:false,
//         id:props.id,
//         draggable:true,
//         drag:{
//           start:{
//             x:0,
//             y:0
//           },
//           offset:{
//             x:0,
//             y:0
//           }
//         }
  
//     }


//     }
//     // edit feature
//     isNestedComponent(){
//       return (this.state.components._class === 'artboard' || this.state.components._class === 'group')
//     }
//     // edit feature
//     isSiblingSelected(){
//       return _.filter(this.siblings,this.isSelected).length > 0;
//     }
  
//     renderWrapper(content){
//       let style =  this.getStyle();
//       //Add in drag offset
//       if(!this.props.isParent){
//         style = {...style, ...this.calcDragOffset(style)}
//       }
  
//       else if(this.props.isParent){
//         style = {...this.props.style}
//       }
  
//       let selectedClass = this.isSelected() ? 'selected' : '';
  
//       //selected component just works normally
  
//       if(this.isSelected()){
//         return (
//           <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} component-${this.props.component.class} ${selectedClass}`} id={this.props.component.id}
//             style={style}
//             onClick={this.onClick}
//             ref='handle'
//             onMouseDown={this.onMouseDownHandler.bind(this)}
//           >
//             { content }
//         </div>)
//       }
  
//       //artboard can be selected with 1 click always
  
//         // else if(this.state.component.class === 'artboard'){
//         //   return (
//         //     <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} component-${this.state.components._class} ${selectedClass}`} id={this.state.id}
//         //       style={style}
//         //       onClick={this.onClick}
//         //       ref='handle'
//         //       onMouseDown={this.onMouseDownHandler.bind(this)}
//         //     >
//         //       { content }
//         //   </div>)
//         // }
  
//       //group
  
//       //if the outermost group, can be selected with 1 click
//       //if inner, can be selected with 2 clicks
  
//       // else if(this.state.components._class === 'group' && this.props.selectable){
//       //   if(this.props.selectionType === 1){
//       //     return (
//       //       <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} hover-active component-${this.state.components._class} ${selectedClass}`} id={this.state.id}
//       //         style={style}
//       //         onClick={this.onClick}
//       //       >
//       //         { content }
//       //     </div>)
//       //   }
//       //   else if(this.props.selectionType === 2){
//       //     return (
//       //       <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} hover-active component-${this.state.components._class} ${selectedClass}`} id={this.state.id}
//       //         style={style}
//       //         onDoubleClick={this.onClick}
//       //       >
//       //         { content }
//       //     </div>)
//       //   }
//       //
//       // }
  
//       //any other component that is currently selectable
  
//       // else if(this.props.selectable){
//       //   if(this.props.selectionType === 1){
//       //     return (
//       //       <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} hover-active component-${this.state.components._class} ${selectedClass}`} id={this.state.id}
//       //         style={style}
//       //         onClick={this.onClick}
//       //       >
//       //         { content }
//       //     </div>)
//       //   }
//       //   else if(this.props.selectionType === 2){
//       //     //solved sibling selection
//       //     // console.log(this.isSiblingSelected(),this.state.selection,this.state.components.siblings);
//       //     return (
//       //       <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} hover-active component-${this.state.components._class} ${selectedClass}`} id={this.state.id}
//       //         style={style}
//       //         onDoubleClick={this.onClick}
//       //         onClick={(e)=>{e.stopPropagation()}}
//       //       >
//       //         { content }
//       //     </div>)
//       //   }
//       // }
  
//       //component isnt selectable
//       else{
//         return (
//           <div className={`component-container ${this.props.isParent ? 'parent' : 'child'} component-${this.props.component.class} ${selectedClass}`}
//             id={this.state.id}
//             style={style}
//             onClick={this.onClick}
//           >
//             { content }
//         </div>)
//       }
  
//     }
//     // edit feature
//     changeDrag(b){
//       this.setState({draggable:b});
//     }
  
//     render(){
  
//       switch(this.props.component.class){
//         case 'shapeGroup':
//           return this.renderWrapper(<ShapeComponent component={ this.props.component }></ShapeComponent>);
//           break;
//         case 'text':
//           return this.renderWrapper(<TextComponent component={this.props.component}></TextComponent>);
//           break;
//         default:
  
//       }
  
//       let parentContent = this.props.component.children.map(id => {
//         return (
//           <ComponentRenderer
//             id={id}
//             key={id}
//           />
//         )
//       });
  
//       let nonParentContent;
  
//       nonParentContent = this.props.component.children.map(id => {
//         return (
//           <ComponentRenderer
//             id={id}
//             key={id}
//           />
//         )
//       })
  
//       return ( this.props.isParent ? this.renderWrapper(parentContent) : this.renderWrapper(nonParentContent))
  
//     }
//   }
  

const mapStateToProps = (state, ownProps) => {

    let domain = getState(state, 'domain');
    let app = getState(state, 'app');

    //tab root is the parent component
    let tabRoot = domain.tabs.allTabs[domain.tabs.activeTab]
    //return the tabRoot
    if(ownProps.isParent){
      return {
        component: tabRoot,
        selection: app.selection.data
      }
    }
  
    //return the component
    else{
      let component = domain.components[ownProps.id];
      return {
        component: component,
        selection: app.selection.data
      }
    }
  
  }

const EditComponent = connect(mapStateToProps)(makeEditComponent(ComponentRender))

export default EditComponent