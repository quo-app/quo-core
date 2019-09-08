import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import _ from 'lodash';

import { actions, selectors } from 'quo-redux/preview';

import { translatePropData } from 'quo-parser/propTranslator';

import ComponentRender from '../coreComponent';

import componentWrapper from '../componentWrapper';


/**
 * each object should have 4 functions to with things to set
*/

const makePreviewComponent = (WrappedComponent, options) => {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          hover: {},
          click: {},
          clicked: false
        }
          // add the rest here
      }
      addStates = (stateBagId, states) => {
        // _.mapKeys(states, (props, key) => {
        //   this.props.dispatch(actions.STATEBAG_STATE_ADD({
        //     stateBagId,
        //     stateId: key,
        //     stateContent: props }))
        // })
      }

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
      handleStates(event){
      }
      // onMouseDown(e){
      //   this.handleStates('onMouseDown');
      //   //apply onMouseDown states
      //   //fire actions to trigger any state changes in other components
      // }
      // onMouseUp(e){
      //   this.handleStates('onMouseUp');
      // }
      onMouseEnter = e => {
        this.setState({ hover : {}});
        // console.log(this.props.currentStateBag.hover.props);
      }
      onMouseLeave = e => {
        this.setState({hover: {}});
        // console.log(this.props.currentStateBag.hover.props);
      }

      onMouseDown = e => {
        this.setState({ click: {}});
      }

      onMouseUp = e => {
        this.setState({ click: {}})
      }

      onClick = e => {
        if (this.state.clicked)
        {
          this.setState({ clicked: false, click: {}})
        } else {
          this.setState({ clicked: true, click: {}})
        }
      }

      // onBlur(e){
      //   this.handleStates('onBlur');
      // }
      // onFocus(e){
      //   this.handleStates('onFocus');
      // }

      createMouseEventListeners = () => {
        if (this.props.isParent) return {};
        return _.mapValues({
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onClick: this.onClick,
          // onFocus: this.onFocus,
          // onBlur: this.onBlur,
        }, f => this.stopPropagation(f));
      }

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
        let props = {};

        _.merge(props,
          this.props.props,
          this.state.hover,
          this.state.click
        );

        return translatePropData('abstract', 'css', pick(props, ['height', 'width', 'y', 'x']));
      }

      render = () => {
        const staticProps = this.createStaticProps()
        const dynamicProps = { style: this.getStyleProps() }
        const eventListeners = this.createMouseEventListeners()
        return(
          <div {...dynamicProps} {...staticProps} {...eventListeners}>
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

    let currentBag;
    let currentStateBag;

    if (!ownProps.isParent) {
      currentBag = ownProps.isParent ? null : selectors.componentCurrentBag(state, { id: component.id });
      let bagId = `${component.id}:${currentBag}`;
      currentStateBag = selectors.statebagStates(state, { stateBagId: bagId }).toJS();
    }

    return {
      id: component.id,
      props: props,
      type: component.type,
      children: component.children,
      currentBag: currentBag,
      currentStateBag: currentStateBag,
      renderType: 'preview',
    }

  }

  const PreviewComponent = connect(mapStateToProps)(componentWrapper(makePreviewComponent(ComponentRender)))

  export default PreviewComponent
