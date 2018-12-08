import ComponentState, { StateGraph } from 'quo-parser/ComponentState';
import { translatePropData } from 'quo-parser/propTranslator';
import { deepFreeze } from 'quo-utils';

import { PropCompositor } from 'quo-redux/helpers';

// import AbstractGroup from './AbstractGroup';
// import AbstractImage from './AbstractImage';
// import AbstractPage from './AbstractPage';
import AbstractShape from './AbstractShape';
import AbstractText from './AbstractText';
import AbstractViewport from './AbstractViewport';

var AbstractComponent;

//Workaround to solve the circular-dependency in es6.
//https://stackoverflow.com/questions/38841469/how-to-fix-this-es6-module-circular-dependency

export function initAbstractComponent(){
    if (AbstractComponent) return;

    AbstractComponent = class AbstractComponent {

        constructor(data){
            this.initCoreProps(data);
            //add support for siblings (LATER))
        }

        initCoreProps(data){

            this.name = data.name;
            this.id = data.do_objectID;
            this.class = data._class;

            // will be utilized later on
            this.snapshot = '';

            //first traverses the tree to create children
            this.initChildren(data);
            //styling
            this.initStates(data);
            //linking
            this.initLinkingStructure();

            //move these into the subclasses

            if(this.is('bitmap')){
              this.initImageProps(data);
            }
        }

        //initially create a tree,
        //then remove the children data,
        //replace it with just the id
        //and add it to top layer.
        initChildren(data){
            //init the children array.
            this.children = [];
            //if it is a leaf component, return
            if(!data.layers) return;

            data.layers.forEach( component => {
                let abstractChild;
                //Special case for artboards that are
                //contained by a page
                if(this.is('page') && component._class === 'artboard'){
                    abstractChild = new AbstractViewport(component);
                    this.children.push(abstractChild);
                }
                else{
                    switch(component._class){
                        case 'star':
                        case 'polygon':
                        case 'triangle':
                        case 'oval':
                        case 'rectangle':
                        case 'shapeGroup':
                        case 'shapePath':
                          abstractChild = new AbstractShape(component);
                          this.children.push(abstractChild);
                        break;
                        case 'text':
                          abstractChild = new AbstractText(component);
                          this.children.push(abstractChild);
                        break;

                        case 'artboard':
                        break;

                        default:
                          abstractChild = new AbstractComponent(component);
                          this.children.push(abstractChild);

                    }
                }
            })
        }


        initStates = data => {
            let _core = deepFreeze(this.initStyleProps(data));

            // default state is always combined with everything. But has the lowest priority,
            // if there are overlapping props.
            let defaultState = new ComponentState('default', [], [], _core, 0);

            // these states all have the this.type =  self,
            let hover = new ComponentState('hover', ['onMouseEnter'], ['onMouseLeave'],{}, 1);
            let pressed = new ComponentState('pressed', ['onMouseDown'], ['onMouseUp'],{}, 1);
            let focused = new ComponentState('focused', ['onFocus'], ['onBlur'], {}, 1);

            // this creates a data structure to hold a reference for how to preview
            // should switch between states, and with which states can it start etc.
            let stateGraph = new StateGraph();
            // adding the default state as it's own node

            // this is the edit setup, 1 node for the mouse events.
            let mouseEventsNode = stateGraph.addNode([defaultState.id, hover.id, pressed.id, focused.id]) // no neigbors
            let headNode = mouseEventsNode;

            let states = {
                'composite':{
                  props:{},
                  modifiers:[defaultState.id]
                },
                [defaultState.id]:defaultState,
                [hover.id]:hover,
                [pressed.id]:pressed,
                [focused.id]:focused,
            }

            states.composite.props = PropCompositor.bakeProps(states.composite.modifiers.map(v => states[v].props));

            this.state = {
                _core,
                headNode,
                defaultState: defaultState.id,
                current:'composite',
                stateGraph,
                states
            }

        }

        initStyleProps(data){
            return translatePropData('sketch','abstract',data);
        }

        initLinkingStructure () {
            this.links = {
                triggers: {
                    onMouseEnter: [],
                    onMouseDown: [],
                    onFocus: [],
                },
                disables: {
                    onMouseLeave: [],
                    onMouseUp: [],
                    onBlur: [],
                },
                targetStateIds: {}
            }
        }

        initImageProps(data){
            this.changeClassTo('image');
            this.imageURL = data.image._ref;
        }
        ///////////////////

        //Helpers

        is(c){
            return this.class === c;
        }

        changeClassTo(newClass){
            this.class = newClass;
        }

    }
}

initAbstractComponent();

export { AbstractComponent as default};
