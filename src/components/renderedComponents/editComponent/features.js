import actions from 'quo-redux/actions';
import { AbstractComponent } from 'quo-parser/abstract';
import { fSafe } from 'quo-utils';

class ComponentInterface {
  constructor(target){
    this.target = target;
  }
}

export class DragInterface extends ComponentInterface {
  constructor(target){
    super(target);
    this.dragStart =  { x: 0, y:0 }
  }

  saveDragStart = (x, y) => {
    this.dragStart =  { x, y }
  }

  startDrag = e => {
    this.saveDragStart(e.pageX, e.pageY);
    document.addEventListener('mousemove', this.dragInstance);
    document.addEventListener('mouseup', this.dragEnd);
  }

  dragInstance = e => {
    e.stopPropagation();

    const componentDOM = document.getElementById(`component-${this.target.props.component.id}`);
    const box = componentDOM.getBoundingClientRect(); 

    const props = AbstractComponent.props(this.target.props.component);

    const { width, x, y } = props(['width','x','y']);

    //including the scale of the viewer zoom

    const scale = box.width / width;

    let deltaX = (e.pageX - this.dragStart.x) * 1 / scale;
    let deltaY = (e.pageY - this.dragStart.y) * 1 / scale;

    if(deltaX !== 0 || deltaY !== 0) this.updateComponentPosition(x + deltaX, y + deltaY)

    this.saveDragStart(e.pageX, e.pageY);
  }

  updateComponentPosition = (x, y) => {
    // run the onDrag of the component if exists
    fSafe(this.target.onDrag)
    // update the store
    const { dispatch } = this.target.props;
    dispatch(actions.UPDATE_COMPONENT_PROPS({ props: {x, y}, id: this.target.props.component.id }));
  }

  dragEnd =  e => {
    this.disableDrag();
    document.removeEventListener('mouseup', this.dragEnd);
    e.stopPropagation();
  }

  disableDrag = () => {
    document.removeEventListener('mousemove', this.dragInstance);
  }
}

export class DoubleClickInterface extends ComponentInterface {

  constructor(target){
    super(target);
    this.doubleClickPossible = false;
    this.doubleClickSpeed = 350;
  }

  handle = e => {
    if(!this.doubleClickPossible){
      this.doubleClickPossible = true;

      setTimeout( () => {
        this.doubleClickPossible = false;
      }, this.doubleClickSpeed)

      // imitate mouseDown
      fSafe( this.target.onMouseDown, e);
    }

    else if( this.doubleClickPossible ){
      this.onDoubleClickMouseDown(e);

    }
  }

  onDoubleClickMouseDown = e => {
    fSafe(this.target.onDoubleClickMouseDown, e);
    document.addEventListener('mouseup', this.onDoubleClickMouseUp);
    e.stopPropagation();
  }

  onDoubleClickMouseUp = e => {
    fSafe(this.target.onDoubleClickMouseUp, e);
    document.removeEventListener('mouseup', this.onDoubleClickMouseUp);
  }
}

export class SelectionInterface extends ComponentInterface {
  constructor(target){
    super(target);
    this.areChildrenInFocus = false;
  }

  decideSelection = e => {
    if(!this.areChildrenInFocus){
      // selecting
      this.selectComponent();
      e.stopPropagation();
      // selecting
    }
    else if (this.areChildrenInFocus){
      // dragging feature
      fSafe(this.target.dragManager.disableDrag)
    }
  }

  makeChildrenSelectable = () => {
    this.areChildrenInFocus = true;
    const { dispatch } = this.target.props;
    // update selectables to be the children
    dispatch(actions.VIEWER_SELECTABLES(this.target.props.component.children));
  }

  makeChildrenUnselectable = () => {
    this.areChildrenInFocus = false;
  }

  selectAChild = e => {
    if(this.target.props.component.children.length > 0){
      // select the child component here
      this.determineWhichChildToSelect(e);
    }
  }

  determineWhichChildToSelect = e => {
    let mouse = {x: e.clientX, y: e.clientY}
    this.target.props.component.children.some( id => {
      // this loop determines which inner child is selected.
      // the criteria is that is it the first
      // child that for which the mouse falls within its
      // boundaries
      let elem = document.getElementById(`component-${id}`);
      let pos = elem.getBoundingClientRect();

      if(this.isWithinBoundaries(pos, mouse)){
        this.selectOtherComponent(id);
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

  selectComponent = () => {
    const { dispatch } = this.target.props;
    dispatch(actions.COMPONENT_SELECT(this.target.props.component.id));
  }

  selectOtherComponent = (id) => {
    const { dispatch } = this.target.props;
    dispatch(actions.COMPONENT_SELECT(id));
  }

}
