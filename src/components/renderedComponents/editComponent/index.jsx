import React from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import { getState } from 'quo-redux/state';
import { translatePropData } from 'quo-parser/propTranslator';
import { AbstractComponent } from 'quo-parser/abstract';

import ComponentRender from '../coreComponent';

const makeEditComponent = (WrappedComponent, options) => {
  return class extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        dragStart: {
            x:0,
            y:0
        },
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
               onClick: this.onClick,
               onMouseDown: this.onMouseDown,
             }

    }

    getStyleProps = () => {
      if(this.props.isParent) return { ...this.props.style }
      const props = AbstractComponent.props(this.props.component);
      return translatePropData('abstract', 'css', props(['width','height','x','y']));
    }

    saveDragStart = (x,y) => {
      this.setState({dragStart: { x, y }});
    }

    onMouseDown = e => {
      // only left mouse click
      if(e.button !== 0) return;

      this.saveDragStart(e.pageX, e.pageY);

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
  
      e.stopPropagation();

    }

    onMouseMove = e => {

      const box = this.DOMref.current.getBoundingClientRect(); 
      const props = AbstractComponent.props(this.props.component);
      const { width, x, y } = props(['width','x','y']);
  
      //including the scale of the viewer zoom

      const scale = box.width / width;

      let deltaX = (e.pageX - this.state.dragStart.x) * 1 / scale;
      let deltaY = (e.pageY - this.state.dragStart.y) * 1 / scale;

      if(deltaX !== 0 || deltaY !== 0){
        let newX = x + deltaX
        let newY = y + deltaY
        //update position in the store
        const { dispatch } = this.props;
        dispatch(actions.UPDATE_COMPONENT_PROPS({ props: {x: newX, y: newY}, id: this.props.component.id }));
      }
  
      this.saveDragStart(e.pageX, e.pageY);
  
      e.preventDefault();
    }

    onMouseUp = e => {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);

      e.stopPropagation();
    }

    onClick = e => {
      if(this.props.isParent) return;
      e.stopPropagation();
      this.selectComponent();
    }

    selectComponent(){
      const { dispatch } = this.props;
      dispatch(actions.COMPONENT_SELECT(this.props.component.id));
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
        component:component,
      }
    }
  
  }

const EditComponent = connect(mapStateToProps)(makeEditComponent(ComponentRender))

export default EditComponent