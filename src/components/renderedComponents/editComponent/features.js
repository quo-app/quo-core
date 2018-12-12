import _ from 'lodash';
import actions from 'quo-redux/actions';
import { AbstractComponent } from 'quo-parser/abstract';
import { fSafe } from 'quo-utils';

class ComponentInterface {
  constructor(target){
    this.target = target;
  }
  // unpack the react component
  get props () { return this.target.props }
  // props
  get dispatch () { return this.props.dispatch }
  get component () { return this.props.component }
  // component related
  get children () { return this.component.get('children') }
  get id () { return this.component.get('id') }

}

export class DragInterface extends ComponentInterface {
  constructor(target){
    super(target);
    this.saveDragStart();
  }

  saveDragStart = (x = 0, y = 0) => {
    this.dragStart =  { x, y }
  }

  startDrag = e => {
    // record the current mouse location,
    this.saveDragStart(e.pageX, e.pageY);
    // and add events for figuring drag
    document.addEventListener('mousemove', this.dragInstance);
    document.addEventListener('mouseup', this.dragEnd);
  }

  dragInstance = e => {
    e.stopPropagation();
    const componentDOM = document.getElementById(`component-${this.id}`);
    const box = componentDOM.getBoundingClientRect();

    const props = this.component.get('props')

    const { width, x, y } = _.pick(props, ['width','x','y']);

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
    // this.dispatch(actions.UPDATE_COMPONENT_PROPS({ props: {x, y}, id: this.id }));
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
    // this is the first mouseDown
    if(!this.doubleClickPossible){
      this.doubleClickPossible = true;

      setTimeout( () => {
        this.doubleClickPossible = false;
      }, this.doubleClickSpeed)

      // imitate mouseDown
      fSafe( this.target.onMouseDown, e);
    }
    // this is the second mouseDown
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
    console.log("HAHAHAHA")
    if(!this.areChildrenInFocus){
      // selecting itself
      this.selectComponent(this.id);
      e.stopPropagation();
      // selecting
    }
    else if (this.areChildrenInFocus){
      // going through and selecting child
      // dragging feature
      fSafe(this.target.dragManager.disableDrag)
    }
  }

  makeChildrenSelectable = () => {
    this.areChildrenInFocus = true;
    // update selectables to be the children
    this.dispatch(actions.SELECTABLES_UPDATE(this.children));
  }

  makeChildrenUnselectable = () => {
    this.areChildrenInFocus = false;
  }

  selectAChild = e => {
    if(this.children.length > 0){
      // select the child component here
      this.pickTheChildUnderTheMousePosition(e);
    }
  }

  pickTheChildUnderTheMousePosition = e => {
    let mouse = {x: e.clientX, y: e.clientY}

    this.children.some( id => {
      // this loop determines which inner child is selected.
      // the criteria is that is it the first
      // child that for which the mouse falls within its
      // boundaries
      let elem = document.getElementById(`component-${id}`);
      let pos = elem.getBoundingClientRect();

      if(this.isWithinBoundaries(pos, mouse)){
        this.selectComponent(id);
        return true;
      }

      return false;
    })
  }

  isWithinBoundaries = (box, pos) => {
    return box.left <= pos.x &&
           box.right >= pos.x &&
           box.top <= pos.y &&
           box.bottom >= pos.y
  }

  selectComponent = id => this.dispatch(actions.SELECTED_COMPONENTS_UPDATE([id]));

}
