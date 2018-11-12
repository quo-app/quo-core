import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import actions from 'quo-redux/actions';

import { Card, DropdownCard } from 'ui-components/cards';
import { Button } from 'ui-components/buttons';
import LinksViewer from 'ui-components/linksViewer';
import LinkBuilder from 'ui-components/linkBuilder';

class LinksTab extends Component {

  constructor (props) {
    super(props);
    this.state = {
      linkBuilderVisible: false
    }
  }

  showLinkBuilder = () => {
    this.setState({linkBuilderVisible: true})
  }

  hideLinkBuilder = () => {
    this.setState({linkBuilderVisible: false})
  }
  
  render(){
    return (
      <div className='links-tab-wrapper'>
      { this.state.linkBuilderVisible ?
        <LinkBuilder onBackClick={this.hideLinkBuilder}/>
        :
        <React.Fragment>
          <LinksViewer/>
          <Button title='Create Link' onClick={this.showLinkBuilder}/>
        </React.Fragment>
      }
      </div>
    )
  }
}

export default LinksTab
