import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

import Resizable from 'quo-packages/resizable';

import Icons from 'quo-ui/icons';

import AssetsTab from './assets';
import LayersTab from './layers';

import StateManager from '../stateManager';

class SideBarLeft extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options : props.tabs,
      components : {assets: AssetsTab, layers: LayersTab, globalLinks: AssetsTab},
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
      dispatch(actions.LEFT_SIDEBAR_SELECTED_UPDATE(e.currentTarget.id));
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
      </Resizable>
      )
  }
}

class SideBarRight extends Component {
  render() {
    return (
      <div className='sidebar-wrapper'>
        <div className={`sidebar-container sidebar-right`}>
            <StateManager/>
        </div>
      </div>
    );
  }
}

function mapStateToPropsLeft(state) {
  let leftSidebar = selectors.leftSidebar(state);
  let tabs = leftSidebar.get('tabs');
  let selected = leftSidebar.get('selected');
  return { tabs, selected }
}

SideBarLeft = connect(mapStateToPropsLeft)(SideBarLeft)

export { SideBarLeft, SideBarRight }
