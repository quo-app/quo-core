import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import Resizable from 'quo-packages/resizable';

import Icons from 'quo-ui/icons';

import AssetsTab from './assets';
import LayersTab from './layers';

import StateManager from 'quo-components/stateManager';
import LinksManager from 'quo-components/linksManager';

const tabDimensions = {
  width: 230,
  height: '100%'
}

class SideBarLeft extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options : props.tabs,
      components : {assets: AssetsTab, layers: LayersTab, globalLinks: AssetsTab},
      icons : {assets:Icons.WebAsset, layers: Icons.Layers, globalLinks: Icons.Link },
      width: tabDimensions.width
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
      dispatch(actions.LEFT_SIDEBAR_SELECTED_UPDATE(e.currentTarget.id));
    }
  }

  render(){
    const CurrentComponent = this.state.components[this.props.selected];
    return(
      <Resizable height={tabDimensions.height} width={`${this.state.width}px`} minWidth={tabDimensions.width} onResize={this.dispatchResize}>
          <div className={`sidebar-container sidebar-left`} id='sidebar-left'>
            <CurrentComponent/>
          </div>
          <div className='interaction-nav left-nav'>
            {
              this.state.options.map((icon,key)=>{
                let selected = this.props.selected === icon ? 'selected-icon' : '';
                let CurrentIcon = this.state.icons[icon];
                return (
                  <div className={`nav-el ${selected}`} onClick={this.onClickNav} id={icon} key={key}>
                    <CurrentIcon/>
                  </div>
                )
              })
            }
          </div>
      </Resizable>
      )
  }
}

class SideBarRight extends Component {

  tabData = {
    components : {
      state: StateManager,
      links: LinksManager,
      interactions: StateManager
    },
    icons : {
      state: Icons.ColorLens,
      links: Icons.Link,
      interactions: Icons.Games
    },
  }

  onClickNav = e => {
    if(e.currentTarget.id !== this.props.selected){
      this.props.dispatch(actions.RIGHT_SIDEBAR_SELECTED_UPDATE(e.currentTarget.id));
    }
  }

  render () {
    const CurrentTab = this.tabData.components[this.props.selected]
    return (
      <div className='sidebar-wrapper sidebar-right' id='sidebar-right'>
        <div className={`sidebar-container sidebar-right`}>
            <CurrentTab/>
        </div>
        <div className='interaction-nav right-nav'>
            {
              this.props.tabs.map((icon, key) => {
                let selected = this.props.selected === icon ? 'selected-icon' : '';
                let CurrentIcon = this.tabData.icons[icon];
                return (
                  <div className={`nav-el ${selected}`} onClick={this.onClickNav} id={icon} key={key}>
                    <CurrentIcon/>
                  </div>
                )
              })
            }
          </div>
      </div>
    );
  }
}

const getSidebarProps = tab => state => {
  let sidebar = selectors[`${tab}Sidebar`](state);
  return {
    tabs: sidebar.get('tabs'),
    selected: sidebar.get('selected')
  };
}

SideBarLeft = connect(getSidebarProps('left'))(SideBarLeft)
SideBarRight = connect(getSidebarProps('right'))(SideBarRight)

export { SideBarLeft, SideBarRight }
