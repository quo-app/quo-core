import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import actions from 'quo-redux/actions';

import { translatePropData } from 'quo-parser/propTranslator';

import ComponentRender from '../coreComponent';

import componentWrapper from '../componentWrapper';


const makePreviewComponent = (WrappedComponent, options) => {
    return class extends Component {
      stopPropagation = f => e => {
        e.stopPropagation();
        return f(e)
      }
      // findStates(trigger, type){
      //   let states = _.omit(this.props.component.state.states, 'composite');
      //   return _.values(_.pickBy(states, state => state[type].includes(trigger)));
      // }
      // addLinkStates(event){
      //   const { dispatch } = this.props;
      //   let links = this.props.component.links.triggers[event];
      //   if(!links) return;
      //   links.forEach( id => {
      //     let linkId = this.props.component.links.targetStateIds[id];
      //     dispatch(actions.ADD_STATE_TO_COMPOSITE({id:id, state:{ id:linkId }}))
      //   })
      // }
      // removeLinkStates(event){
      //   const { dispatch } = this.props;
      //   let links = this.props.component.links.disables[event];
      //   if(!links) return;
      //   links.forEach( id => {
      //     let linkId = this.props.component.links.targetStateIds[id];
      //     dispatch(actions.REMOVE_STATE_FROM_COMPOSITE({id:id, state:{ id:linkId }}))
      //   })
      // }
      // addStates(id,states){
      //   const { dispatch } = this.props;
      //   states.forEach(s => {
      //     dispatch(actions.ADD_STATE_TO_COMPOSITE({id:id, state:s}))
      //   })
      // }
      // removeStates(id,states){
      //   const { dispatch } = this.props;
      //   states.forEach(s => {
      //     dispatch(actions.REMOVE_STATE_FROM_COMPOSITE({id:id, state:s}))
      //   })
      // }
      // handleStates(event){
      //   // states of the component
      //   this.addStates(this.props.component.id, this.findStates(event,'ins'));
      //   this.removeStates(this.props.component.id, this.findStates(event,'outs'));
      //   // states for other components
      //   this.addLinkStates(event);
      //   this.removeLinkStates(event);
      // }
      // onMouseDown(e){
      //   this.handleStates('onMouseDown');
      //   //apply onMouseDown states
      //   //fire actions to trigger any state changes in other components
      // }
      // onMouseUp(e){
      //   this.handleStates('onMouseUp');
      // }
      // onMouseEnter(e){
      //   this.handleStates('onMouseEnter');
      // }
      // onMouseLeave(e){
      //   this.handleStates('onMouseLeave');
      // }
      // onBlur(e){
      //   this.handleStates('onBlur');
      // }
      // onFocus(e){
      //   this.handleStates('onFocus');
      // }

      // getStyleProps = () =>   {
      //   if(this.props.isParent) return { ...this.props.style }
      //   const props = this.props.component.state.states.composite.props
      //   return translatePropData('abstract', 'css', _.pick(props,['width','height','x','y']));
      // }

      // createMouseEventListeners = () => {
      //   if (this.props.isParent) return {};
      //   return _.mapValues({
      //     onMouseDown: this.onMouseDown,
      //     onMouseUp: this.onMouseUp,
      //     onMouseEnter: this.onMouseEnter,
      //     onMouseLeave: this.onMouseLeave,
      //     onFocus: this.onFocus,
      //     onBlur: this.onBlur,
      //   }, f => this.stopPropagation(f.bind(this)));
      // }

      // createWrapperProps = () => {

      //   const componentClass = this.props.isParent ? 'parent' : this.props.component.class
      //   const className = `preview-component ${componentClass}-component`
      //   const id = `component-${this.props.component.id}`
      //   const style = this.getStyleProps();
      //   const mouseEventListeners = this.createMouseEventListeners();

      //   return {
      //             className,
      //             id,
      //             style,
      //             ...mouseEventListeners,
      //           }

      // }

      createStaticProps = () => {
        const className = `preview-component ${this.props.type}-component`
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

      getStyleProps = () => {
        if(this.props.isParent) return { ...this.props.props }
        return translatePropData('abstract', 'css', pick(this.props.props, ['width','height','x','y']));
      }

      render = () => {
        const staticProps = this.createStaticProps()
        const dynamicProps = this.createDynamicProps()
        return(
          <div {...dynamicProps} {...staticProps}>
            <WrappedComponent {...this.props} wrapper={PreviewComponent} renderType='preview'/>
          </div>
        )
      }
    }
  }

  const mapStateToProps = (state, ownProps) => {
    if(!ownProps.selector) return {}

    const component = ownProps.isParent ? ownProps.component : ownProps.selector(state, ownProps.id)

    let props;

    props = component.props;

    return {
      id: component.id,
      props: props,
      type: component.type,
      children: component.children,
      renderType: 'preview',
    }

  }

  const PreviewComponent = connect(mapStateToProps)(componentWrapper(makePreviewComponent(ComponentRender)))

  export default PreviewComponent
