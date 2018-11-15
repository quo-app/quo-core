import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import { getState } from 'quo-redux/state';

import Resizable from 'quo-packages/resizable';

import Icons from 'quo-ui/icons';

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
      icons : {assets:Icons.WebAsset, layers: Icons.Layers, globalLinks: Icons.Link },
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
                    <CurrentIcon/>
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
      components : {styles: PropsTab, links: LinksTab, interactions: LinksTab},
      icons : {styles: Icons.ColorLens, links: Icons.FlashOn, interactions: Icons.Games},
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
