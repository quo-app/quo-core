import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Map } from  'immutable'

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import SelectionFrame from 'quo-components/selectionFrame';
import { EditComponent } from 'quo-components/renderedComponents';

import { dimensions } from './constants';

//fix this to incorporate changing sidebar sizes
const viewerDimensions = {
  w: window.innerWidth - (dimensions.sidebar.w + 260),
  h: window.innerHeight - dimensions.nav.h
}

const viewerRatio = viewerDimensions.w / viewerDimensions.h
const viewerHeight = 3000

const viewerSize = {
  w: parseInt(viewerHeight * viewerRatio,10),
  h: viewerHeight,
}

class Viewer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keyDown: false,
      draggableClick: false,
      selection: this.props.selection,
      viewerPos:{ x: (viewerDimensions.w - viewerSize.w) / 2, y: (viewerDimensions.h - viewerSize.h) / 2 },

      // Zoom and Pan
      offsetX: (viewerDimensions.w - viewerSize.w) / 2,
      offsetY: (viewerDimensions.h - viewerSize.h) / 2,
      scale: 1.0,
      threshold:{
        x: { min: 0, max: 0 },
        y: { min: 0, max: 0 }
      },
      viewerSize: viewerSize,
      viewerDOMDimensions: {
        w:1200,
        h:1400
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.activeTabObject){
      const { dispatch } = this.props;
      dispatch(actions.SELECTABLES_UPDATE(nextProps.childrenComponents))
    }
  }

  onMouseDown = (e) => {
    const { dispatch } = this.props;
    const selection = this.childUnderTheMouse(e)
    dispatch(actions.SELECTED_COMPONENTS_UPDATE(selection));
    dispatch(actions.SELECTABLES_UPDATE(this.props.childrenComponents))
    e.stopPropagation()
  }

  onMouseDownBg = () => {
    const { dispatch } = this.props;
    dispatch(actions.SELECTED_COMPONENTS_UPDATE([]));
    dispatch(actions.SELECTABLES_UPDATE(this.props.childrenComponents))
  }

  childUnderTheMouse = e => {
    const pos = { x: e.clientX, y: e.clientY }
    let selection = []
    let components = this.props.childrenComponents.map(id => [id, document.getElementById(`component-${id}`).getBoundingClientRect()])
    components.some(components => {
      if(this.isWithinBoundaries(components[1], pos)){
        selection.push(components[0])
        return true
       }
    })
    return selection
  }

  isWithinBoundaries = (box, pos) => {
    return box.left <= pos.x &&
           box.right >= pos.x &&
           box.top <= pos.y &&
           box.bottom >= pos.y
  }

  onWheel= e => {

    console.log('doing this')

    e.preventDefault();

    let posOfViewer = this.viewer.getBoundingClientRect();

    let posOfViewerBg = this.viewerBg.getBoundingClientRect();

    if (e.ctrlKey) {

      let dScale = - e.deltaY * 0.01
      let scale = this.state.scale + dScale;

      let size = {
        w: (posOfViewerBg.width / this.state.scale) * scale,
        h: (posOfViewerBg.height / this.state.scale) * scale,
      }

      if(size.w < posOfViewer.width || size.h < posOfViewer.height){
        return
      }

      let offsetX = this.state.offsetX - ((e.clientX - posOfViewer.left - this.state.offsetX) / ( this.state.scale)) * dScale
      let offsetY = this.state.offsetY - ((e.clientY - posOfViewer.top - this.state.offsetY) / ( this.state.scale)) * dScale

      if(posOfViewerBg.left >= posOfViewer.left){
        offsetX = this.state.offsetX
      }

      if(posOfViewerBg.right <= posOfViewer.right){
        offsetX = this.state.offsetX - ((posOfViewer.width - this.state.offsetX) / ( this.state.scale)) * dScale
      }

      if(posOfViewerBg.top >= posOfViewer.top){
        offsetY = this.state.offsetY
      }

      if(posOfViewerBg.bottom <= posOfViewer.bottom){
        offsetY = this.state.offsetY - ((posOfViewer.height - this.state.offsetY) / ( this.state.scale)) * dScale
      }

      //Check if it's zooming in too much
      if(scale > 10){
        return;
      }

      this.setState({ offsetX, offsetY, scale });
    }

    else{

      let threshold = this.getThresholdForPanning();

      let pos = this.calcPanningOffsets(threshold, e)

      this.setState({ offsetX: pos.x, offsetY: pos.y });

    }

  }

  getThresholdForPanning = () => {

    let threshold = this.state.threshold

    let posOfViewer = this.viewer.getBoundingClientRect();

    let posOfViewerBg = this.viewerBg.getBoundingClientRect();

    threshold.x = { min: -posOfViewerBg.width + posOfViewer.width, max: 0}
    threshold.y = { min: -posOfViewerBg.height + posOfViewer.height, max: 0}

    this.setState({ threshold })

    return threshold;
  }

  calcPanningOffsets = (threshold, e) => (
    {
      x: Math.min(threshold.x.max ,Math.max(threshold.x.min, this.state.offsetX - e.deltaX)),
      y: Math.min(threshold.y.max ,Math.max(threshold.y.min, this.state.offsetY - e.deltaY))
    }
  )

  createMatrix = () => {
    const { scale, offsetX, offsetY } = this.state
    const matrixValues = [scale, 0, 0, scale, offsetX, offsetY]
    return `matrix(${matrixValues.join(', ')})`
  }

  renderComponents(){
    const ComponentRenderClass = EditComponent
    const parentComponent = Map({
      id: this.props.activeTabObject.rootComponent.id,
      type: 'parent',
      children: this.props.activeTabObject.rootComponent.children,
      props: Map(this.props.activeTabObject.rootComponent.props)
    })
    return (
      <ComponentRenderClass
        style={{
            left:'750px',
            top:'525px',
        }}
        isParent
        component={parentComponent}
        selector={(state, id) => selectors.components(state).get(id)}
      />
    )
  }

  renderViewer(){
    let draggableClass = this.state.draggable ? 'draggable' : ''
    let bgClass = this.props.appMode === 'EDIT' ? 'edit-mode' : 'preview-mode'
    const { threshold, viewerDOMDimensions, offsetX, offsetY } = this.state
    return (
      <React.Fragment>
        {/* Scrollbars */}
        <div className='viewer-scrollbar x-axis' style={{
          left:`${offsetX / (threshold.x.max - threshold.x.min) * (viewerDimensions.w - 40)}px`
        }}></div>
        <div className='viewer-scrollbar y-axis' style={{
          top:`${offsetY / (threshold.y.max - threshold.y.min) * (viewerDimensions.h - 40)}px`
        }}></div>

        {/* Background of the Viewer */}
        <div
          className={`component-viewer-bg ${bgClass}`}
          ref={ c => this.viewerBg = c}
          onMouseDown={this.onMouseDownBg}
          style={{
            width: `${viewerSize.w}px`,
            height: `${viewerSize.h}px`,
            transformOrigin: '0 0 0',
            transform: this.createMatrix()
          }}>
          {/* Main  */}
          <div
            className={`component-viewer ${draggableClass}`}
            tabIndex='0'
            onMouseDown={this.onMouseDown}
            style={{
              left:`${(viewerSize.w / 2) - (viewerDOMDimensions.w / 2)}px`,
              top:`${(viewerSize.h / 2) - (viewerDOMDimensions.h / 2)}px`,
              width:`${viewerDOMDimensions.w}px`,
              height:`${viewerDOMDimensions.h}px`,
            }}>
            {
              this.renderComponents()
            }
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderViewerWrapper(){
    return (
      <div
        className='viewer-wrapper scroll-disabled'
        onWheel={this.props.activeTab !== '' ? this.onWheel : () => {}}
        ref={ c => this.viewer = c}>
        {
          this.props.activeTab !== '' ? this.renderViewer() : null
        }
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <SelectionFrame scale={this.state.scale}/>
        {
          this.renderViewerWrapper()
        }
      </React.Fragment>

      )
  }
}

//The viewer views the current window

function mapStateToProps(state) {
  //if there are no tabs created, don't display anything
  let activeTab = selectors.tabs(state).get('currentTab');


  if(activeTab === '') {
    return {
      activeTab: activeTab,
    }
  }

  let activeTabObject = selectors.tabs(state).getIn(['tabs', activeTab]);
  //if there is an active tab, collect the data from the tab
  return {
    activeTab: activeTab,
    activeTabObject: activeTabObject,
    childrenComponents: activeTabObject.rootComponent.children,
    appMode: selectors.appMode(state),
  }
}

export default connect(mapStateToProps)(Viewer);
