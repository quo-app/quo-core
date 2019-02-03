import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import SnapshotContainer from 'quo-components/snapshotContainer';

import HorizontalOptionGroup from 'quo-ui/horizontalOptionGroup';

import data from './data';

class AssetsTab extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTab:'static',
      filetype:'sketch',
    }
    this.updateTab = this.updateTab.bind(this)
  }

  updateTab(newTab){
    this.setState({currentTab:newTab})
  }

  componentDidMount(){
    if(!data) return;
    const { dispatch } = this.props;
    // dispatch(actions.SKETCH_ASSETS_ADD(data));
  }

  render(){
    return (
      <div className='assets-tab-wrapper'>
        {/* <HorizontalOptionGroup
          options={
            [
              {text:'Static',callback:()=>{this.updateTab('static')}},
              {text:'Reactive',callback:()=>{this.updateTab('reactive')}}
            ]
          }
        /> */}
        {/* {
          this.state.currentTab === 'static'
          ?
          <AssetsViewer assets={this.props.assets} components={this.props.components}/>
          :
          null
        } */}
        <AssetPageViewer assets={this.props.assets}/>
      </div>
    )
  }
}

class AssetPageViewer extends Component {

  state = {
    selected: ''
  }

  componentWillReceiveProps (nextProps) {
    this.updateSelected(nextProps.assets.first())
  }

  updateSelected = page => this.setState({ selected: page })

  /*
    returns viewportComponent[]
  */

  getViewports(){
    // if there are no assets
    if(!this.props.assets.first()) {
      return []
    }
    const currentComponents = this.state.selected.components
    const pickViewports = component => component.type === 'viewport'
    const onlyViewports = _.pickBy(currentComponents, pickViewports)
    return _.values(onlyViewports)
  }

  render(){

    // Find the pages
    let pages = this.props.assets.size === 0 ? [] : this.props.assets.valueSeq()

    // Find the components
    let viewports = this.getViewports();
    let components = viewports.length > 0 ? this.state.selected.components : {}


    return (
      <div className='assets-library-wrapper'>
      <div className='card-header'>
        Sketch Pages
      </div>
      <div className='card-body'>
        {
          pages.map((page, i)=>{
            return(
              <div className={`page ${page.id === this.state.selected.id ? 'selected' : ''}`} key={i} onClick={()=>{this.updateSelected(page)}}> {page.title} </div>
            )
          })
        }
      </div>
      <div className='assets-preview-wrapper'>
        <div className='asset-preview-table'>
        {
          viewports.map( (viewport, i) => <AssetPreview key={i} component={viewport} components={components} title={viewport.title}/>)
        }
        </div>
      </div>
    </div>

    )
  }
}

class AssetPreview extends Component {
  constructor(props){
    super(props);
    this.state = {
      draggable: false,
      dragImage: null,
      dragImageNode: null,
    }
  }
  addAssetToEditor = () => {
    const { dispatch } = this.props;
    dispatch(actions.ADD_ASSET_TO_EDITOR_AND_TAB({
      component: this.props.component,
      components: this.props.components }))
  }

  onRender = (image) => {
    this.setState({dragImage:image})
  }

  onDragStart = (e) => {

    let img = new Image();

    this.setState({
      draggable: true,
      dragImageNode: img,
    });

    img.src = this.state.dragImage;
    document.body.appendChild(img);
    e.dataTransfer.setData("text/plain", this.props.component.id);
    e.dataTransfer.setDragImage(img, 0, 0);
    return false
  }

  onDragEnd = () => {
    this.setState({draggable:false});
    if(this.state.dragImageNode) this.state.dragImageNode.remove();
  }

  render = () => {

    let selector = state => selectors.assetsSketch(state).first().components
    let propsSelector = component => {
      return component.props
     }

    return (

      <div className={`asset-preview-wrapper ${this.props.filetype}-asset`} onDoubleClick={this.addAssetToEditor}>
        <div className='asset-preview-title'>
          {this.props.title}
        </div>
        <div
          className={`asset-preview-image ${this.state.draggable ? 'draggable' : ''}`}
          draggable
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <SnapshotContainer
            selector={selector}
            propsSelector={propsSelector}
            component={this.props.component} onRender={this.onRender}/>
        </div>
      </div>
    )
  }
}

AssetPreview = connect()(AssetPreview)

const mapStateToProps = (state) => {
  return {
    assets: selectors.assetsSketch(state)
  }
}

export default connect(mapStateToProps)(AssetsTab);
