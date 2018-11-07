import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import actions from 'quo-redux/actions';
import { getState } from 'quo-redux/state';

import Resizable from '../../packages/resizable/resizable';

// import { ContentPagesCard, LayersCard } from '../styleCard/styleCard';

//Icons for the interaction-nav(right)

import GamesIcon from 'material-ui-icons/Games';
import FlashOnIcon from 'material-ui-icons/FlashOn';
import ColorLensIcon from 'material-ui-icons/ColorLens';

//Icons for the interaction-nav(left)

import LayersIcon from 'material-ui-icons/Layers';
import WebAssetIcon from 'material-ui-icons/WebAsset';
import LinkIcon from 'material-ui-icons/Link';



import AssetsTab from './assets';
import LayersTab from './layers';
import LinksTab from './links';
import PropsTab from './props';

class SideBarLeft extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options : props.tabs,
      components : {assets:AssetsTab, layers:LayersTab, globalLinks:AssetsTab},
      icons : {assets:WebAssetIcon, layers:LayersIcon, globalLinks:LinkIcon },
      width:230,
      height:'100%',
    }

    this.onClickNav = this.onClickNav.bind(this);
    this.dispatchResize = this.dispatchResize.bind(this);

  }

  dispatchResize(width){
    width = parseInt(width.slice(0,-2));
    const { dispatch } = this.props;
    dispatch(actions.RESIZE_SIDEBAR({target:'left', width }));
  }

  onClickNav(e) {
    if(e.currentTarget.id !== this.props.selected){
      const { dispatch } = this.props;
      dispatch(actions.UPDATE_SIDEBAR_TAB({target:'left',selected:e.currentTarget.id}));
    }
  }

  render(){
    const CurrentComponent = this.state.components[this.props.selected];
    return(
      <Resizable height='100%' width={`${this.state.width}px`} minWidth='230' onResize={this.dispatchResize}>
          <div className={`sidebar-container sidebar-left`}>
            <CurrentComponent/>
          </div>
          <div className='interaction-nav left-nav'>
            {
              this.state.options.map((icon,key)=>{
                let selected = this.props.selected === icon ? 'selected-icon' : '';
                let CurrentIcon = this.state.icons[icon];
                return (
                  <div className={`nav-el ${selected}`} onClick={this.onClickNav} id={icon} key={key}>
                    {/* <CurrentIcon/> */}
                  </div>
                )
              })
            }
          </div>
        {/* </div> */}
      </Resizable>
      )
  }
}

class SideBarRight extends Component {

  constructor(props) {

    super(props);

    this.state = {
      options : props.tabs,
      components : {styles:PropsTab, links:LinksTab, interactions:LinksTab},
      icons : {styles:ColorLensIcon, links:FlashOnIcon, interactions:GamesIcon},
      selectedComponent : props.selection
    }

    this.onClickNav = this.onClickNav.bind(this);

  }

  onClickNav(e) {
    if(e.currentTarget.id !== this.props.selected){
      const { dispatch } = this.props;
      dispatch(actions.UPDATE_SIDEBAR_TAB({target:'right',selected:e.currentTarget.id}));
    }
  }

  onClickAddToArr() {

  }

  // {/* <ComponentStates/> */}
  // {/* <MiniPreview/> */}
  // {/* <ButtonCore className='add-to-arrangement' title='Add to Arrangement' onClick={this.onClickAddToArr}/> */}

  render() {
    const CurrentComponent = this.state.components[this.props.selected];
    return (
      <div className='sidebar-wrapper'>
        <div className={`sidebar-container sidebar-right`}>
            <CurrentComponent/>
        </div>
        <div className='interaction-nav right-nav'>
          {
            this.state.options.map((icon,key)=>{
              let selected = this.props.selected === icon ? 'selected-icon' : '';
              let CurrentIcon = this.state.icons[icon];
              return (
                <div className={`nav-el ${selected}`} onClick={this.onClickNav} id={icon} key={key}>
                  {/* <CurrentIcon/> */}
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToPropsRight(state) {

  let ui = getState(state,'ui');
  return { ...ui.sidebars.right }
}

function mapStateToPropsLeft(state) {
  let ui = getState(state,'ui')
  return { ...ui.sidebars.left }
}

SideBarRight = connect(mapStateToPropsRight)(SideBarRight)
SideBarLeft = connect(mapStateToPropsLeft)(SideBarLeft)

export { SideBarLeft, SideBarRight }
